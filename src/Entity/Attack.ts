// Damage - How much damage the attack will do if it hits
// Number -  The number of times the Unit attacks in one Interact Action.
// Base Accuracy - How likely the unit is to hit.  This may be affected by spells, terrain, skills, or anything else.
// Type - Physical, magical

export class Attack {
    Name:string;
    Damage:number;
    Number:number;
    BaseAccuracy:number;
    Type:AttackTypes;
}

export enum AttackTypes {
    Physical,
    Magical
}