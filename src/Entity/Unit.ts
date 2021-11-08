// HP - Current and Max.  When a unit is reduced to 0 HP they are removed from the board.
// Armor - Incoming damage from physical attacks is reduced by this amount.
// Magic Resist - Incoming damage from magic attacks is reduced by this amount.  
// Movement - How far a unit can move a turn.  Measured in spaces.
// Movement Type - How a unit moves (ground, flight, burrow, etc.)
// Melee Attack - A Units melee attack.  This is optional.
// Ranged Attack - A Units ranged attack.  This is optional.
// Skills - A catch all area that changes the way this unit acts.  For instance, the Swift skill may let a unit take the Move Action after the Interact Action, which is normally not allowed.

import { Attack } from "./Attack";
import { Player } from "./Player";

export class Unit {
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

    constructor() {
        this.MovementType = MovementTypes.Ground;
        this.Skills = [];
    }

    
}

export enum UnitTypes {
    TestUnit,
    TestUnit2
}

export enum MovementTypes {
    Ground,
    Flight
}