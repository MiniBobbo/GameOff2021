import { Scene } from "phaser";
import { BattleSprite } from "../BattleScene/BattleSprite";
import { Attack } from "../Entity/Attack";
import { Unit, UnitStatus } from "../Entity/Unit";
import { BattleAttackerAttackState } from "../Managers/BattleStates/BattleAttackerAttackState";
import { BattleDefenderAttackState } from "../Managers/BattleStates/BattleDefenderAttackState";
import { BattleState } from "../Managers/BattleStates/BattleState";
import { BattleStateManager, BattleStateTypes } from "../Managers/BattleStates/BattleStateManager";
import { BattleWaitState } from "../Managers/BattleStates/BattleWaitState";
import { StateManager, StateTypes } from "../Managers/StateManager";
import { UnitSprite } from "../StrategyScene/UnitSprite";
import { SceneEvents } from "./GameScene";

export class BattleScene extends Phaser.Scene {
    BattleLayer:Phaser.GameObjects.Layer;
    SM:BattleStateManager;

    private init:boolean = false;
    private AttackerSprite:BattleSprite;
    private DefenderSprite:BattleSprite;
    private Attacker:Unit;
    private Defender:Unit;
    private attackersTurn:boolean = true;

    //Holds the result of the attack that will be resolved at the appropriate time of the animation.
    private result: {hit:boolean, damage:number};

    private battleType:BattleType;

    create(units?:{attacker?:Unit, defender?:Unit, type?:BattleType}) {
        console.log('BattleScene started.');
        if(!this.init)
            this.initFunction();

        this.battleType = units.type!=null? units.type:BattleType.Melee;

        this.BattleLayer = this.add.layer([this.AttackerSprite.s, this.DefenderSprite.s]).setDepth(5);
        this.Attacker = units.attacker;
        this.Defender = units.defender;

        this.Attacker.ResetForBattle(this.battleType);
        this.Defender.ResetForBattle(this.battleType);

        this.AttackerSprite.SetUnit(this.Attacker);
        this.DefenderSprite.SetUnit(this.Defender);

        if(this.battleType == BattleType.Melee) {
            this.AttackerSprite.s.setPosition(200,200);
            this.DefenderSprite.s.setPosition(200,200);
        } else {
            this.AttackerSprite.s.setPosition(100,200);
            this.DefenderSprite.s.setPosition(300,200);
        }

        this.attackersTurn = true;

        this.SetSprites();
        this.scene.moveAbove('game', 'battle');
        this.events.emit(SceneEvents.Finished);

    }

    private initFunction() {
        this.init = true;
        this.AttackerSprite = new BattleSprite(this); 
        this.DefenderSprite = new BattleSprite(this);
        this.DefenderSprite.s.flipX = true; 
        this.SM = new BattleStateManager(this);

        //Create the state flows
        this.SM.States.set(BattleStateTypes.Wait, new BattleWaitState(this, this.SM));
        this.SM.States.set(BattleStateTypes.AttackerAttack, new BattleAttackerAttackState(this, this.SM));
        this.SM.States.set(BattleStateTypes.DefenderAttack, new BattleDefenderAttackState(this, this.SM));
        this.SM.ChangeState(BattleStateTypes.Wait);


        //Events
        this.events.on(SceneEvents.Finished, () => {
            this.NextStep();
        });

    }
    NextStep() {
        if(this.Attacker.Status == UnitStatus.Dead || this.Defender.Status == UnitStatus.Dead || (this.Attacker.CurrentAttacks == 0 && this.Defender.CurrentAttacks == 0)) {
            //End the battle and communicate results back to the main scene

        } else {
            let currentAttacker:BattleSprite;
            let currentDefender:BattleSprite;
            if(this.attackersTurn) {
                currentAttacker = this.AttackerSprite;
                currentDefender = this.DefenderSprite;
            }
            else {
                currentAttacker = this.DefenderSprite;
                currentDefender = this.AttackerSprite;
            }

            if(currentAttacker.u.CurrentAttacks > 0) {
                this.result = this.GetAttackResult(currentAttacker, currentDefender, this.battleType);
                currentAttacker.s.emit('attack', { currentDefender, type:this.battleType });
                
            }
        }
        this.attackersTurn = !this.attackersTurn;
        this.NextStep();
    }
    GetAttackResult(a:BattleSprite, d:BattleSprite, type:BattleType): { hit: boolean; damage: number; } {
        //This is technically weighted to hitting since it should be over 0 and including 1, but I don't want to code around that and
        //with the precision of the decimal generated it probably doesn't matter.  Wait, no, because I am looking for numbers under the accuracy value
        //so this is weighted towards hitting.  Good, I guess?  
        //TODO: Check if this matters.
        let roll = Phaser.Math.FloatBetween(0,1);
        let attack:Attack;
        if(type == BattleType.Melee) {
            attack = a.u.MeleeAttack;
        } else {
            attack = a.u.RangedAttack;
        }

        if(roll <= attack.BaseAccuracy) {
            return {hit:true, damage:attack.Damage};
        } else 
            return {hit:false, damage:0};

    }



    SetSprites() {
        this.AttackerSprite.s.play(`${this.Attacker.Type.toString()}_idle`);
        this.DefenderSprite.s.play(`${this.Defender.Type.toString()}_idle`);
    }
    
}

export enum BattleType {
    Melee,
    Ranged
}

