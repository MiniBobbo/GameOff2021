// HP - Current and Max.  When a unit is reduced to 0 HP they are removed from the board.
// Armor - Incoming damage from physical attacks is reduced by this amount.
// Magic Resist - Incoming damage from magic attacks is reduced by this amount.  
// Movement - How far a unit can move a turn.  Measured in spaces.
// Movement Type - How a unit moves (ground, flight, burrow, etc.)
// Melee Attack - A Units melee attack.  This is optional.
// Ranged Attack - A Units ranged attack.  This is optional.
// Skills - A catch all area that changes the way this unit acts.  For instance, the Swift skill may let a unit take the Move Action after the Interact Action, which is normally not allowed.

import { C } from "../C";
import { BattleType } from "../scene/BattleScene";
import { Attack, AttackTypes } from "./Attack";
import { Player } from "./Player";

export class Unit {
    ID:number;
    Name:string;
    Type:UnitTypes;
    CurrentHP:number;
    MaxHP:number;
    Armor:number;
    MagicResist:number;
    Movement:number;
    MovementType:MovementTypes;
    Skills:string[];
    MeleeAttack:Attack;
    RangedAttack:Attack;
    ControllingPlayer:Player;

    CurrentAttacks:number;

    Status:UnitStatus;

    constructor() {
        this.MovementType = MovementTypes.Ground;
        this.Skills = [];
        this.Status = UnitStatus.Alive; 
        this.ID = C.ID++;

        let m = new Attack();
        m.Name = 'None';
        m.Type = AttackTypes.Physical;
        this.MeleeAttack = m;

        let r = new Attack();
        r.Name = 'None';
        r.Type = AttackTypes.Physical;
        this.RangedAttack = r;


        
    }

    /**This unit should take damage.  This can be negative for healing. */
    Damage(amount:number) {
        this.CurrentHP -= amount;
        this.CurrentHP = Phaser.Math.Clamp(this.CurrentHP, 0, this.MaxHP);
        if(this.CurrentHP == 0) {
            this.Status = UnitStatus.Dead;
        }
    }
    
    ResetForBattle(type:BattleType) {
        if(type == BattleType.Melee)
        this.CurrentAttacks = this.MeleeAttack.Number;
        else
        this.CurrentAttacks = this.RangedAttack.Number;
    }
    
}

export enum UnitTypes {
    ant = 'ant',
    fly = 'fly'
}

export enum UnitStatus {
    Alive = 'Alive',
    Dead = 'Dead'
}

export enum MovementTypes {
    Ground,
    Flight
}

