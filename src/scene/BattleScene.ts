import { BattleSprite } from "../BattleScene/BattleSprite";
import { Attack } from "../Entity/Attack";
import { Unit, UnitStatus } from "../Entity/Unit";
import { StateManager, StateTypes } from "../Managers/StateManager";
import { GameScene, SceneEvents } from "./GameScene";

export class BattleScene extends Phaser.GameObjects.Container {
    BattleLayer:Phaser.GameObjects.Layer;

    private gs:GameScene;

    private init:boolean = false;
    private AttackerSprite:BattleSprite;
    private DefenderSprite:BattleSprite;
    private Attacker:Unit;
    private Defender:Unit;
    private attackersTurn:boolean = true;

    private currentAttacker:BattleSprite;
    private currentDefender:BattleSprite;


    //Holds the result of the attack that will be resolved at the appropriate time of the animation.
    private result: {hit:boolean, damage:number};

    private battleType:BattleType;

    constructor(gs:GameScene) {
        super(gs, 0,-500);
        this.gs = gs;
        this.initFunction();
    }

    Start(attacker:Unit, defender:Unit, type:BattleType) {
        console.log('BattleScene started.');

        this.battleType = type!=null? type:BattleType.Melee;

        this.Attacker = attacker;
        this.Defender = defender;

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
        
        this.gs.tweens.add({
            targets:this,
            y:0,
            duration:500,
            // ease:'quadinout',
            onComplete:this.NextStep,
            callbackScope:this
        });

    }

    private initFunction() {
        this.init = true;
        this.AttackerSprite = new BattleSprite(this.gs); 
        this.DefenderSprite = new BattleSprite(this.gs);
        this.DefenderSprite.s.flipX = true; 

        this.add(this.AttackerSprite.s);
        this.add(this.DefenderSprite.s);

        this.setDepth(5);
        this.gs.add.existing(this);


        this.setVisible(false);

        this.gs.events.on(BattleSceneEvents.ResolveAttack, this.ResolveAttack, this);

    }
    
    NextStep() {
        if(this.Attacker.Status == UnitStatus.Dead || this.Defender.Status == UnitStatus.Dead || (this.Attacker.CurrentAttacks == 0 && this.Defender.CurrentAttacks == 0)) {
            //End the battle and communicate results back to the main scene
            this.gs.SM.ChangeState(StateTypes.AttackResult, {attacker:this.Attacker, defender:this.Defender});
            // s.events.emit(SceneEvents.Finished);
        } else {
            if(this.attackersTurn) {
                this.currentAttacker = this.AttackerSprite;
                this.currentDefender = this.DefenderSprite;
            }
            else {
                this.currentAttacker = this.DefenderSprite;
                this.currentDefender = this.AttackerSprite;
            }

            if(this.currentAttacker.u.CurrentAttacks > 0) {
                // this.attackersTurn = !this.attackersTurn;
                this.currentAttacker.u.CurrentAttacks--;
                this.result = this.GetAttackResult(this.currentAttacker, this.currentDefender, this.battleType);
                this.currentAttacker.s.emit('attack', {type:this.battleType });
            }
            this.attackersTurn = !this.attackersTurn;
        }
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

    ResolveAttack() {
        console.log(`${this.currentAttacker.u.Name} attacks ${this.currentDefender.u.Name}, ${this.result.hit} Damage: ${this.result.damage}`);
        //Do damage to the defending unit if needed.
        if(this.result.hit) {
            this.currentDefender.u.Damage(this.result.damage);
            if(this.currentDefender.u.Status == UnitStatus.Dead)
                this.currentDefender.PlayAnimation('died');
            else 
                this.currentDefender.PlayAnimation('hit');
        }
        this.gs.time.addEvent({
            delay:500, 
            callback: ()=> {this.NextStep();},
            callbackScope:this
        });

        
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

export enum BattleSceneEvents {
    ResolveAttack = 'resolveattack',
    BattleFinish = 'battlefinish'
}