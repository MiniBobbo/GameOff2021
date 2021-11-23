import { Attack, AttackTypes } from "../../Entity/Attack";
import { MovementTypes, Unit } from "../../Entity/Unit";

export class RoachKing extends Unit {
    constructor() {
        super();
        this.MaxHP = this.CurrentHP = 80;
        this.Armor = 4;
        this.MagicResist = 4;
        this.Movement = 3;
        this.MovementType = MovementTypes.Ground;
        let a = new Attack();
        a.Name = 'Bite';
        a.BaseAccuracy = .5;
        a.Damage = 2;
        a.Number = 2;
        a.Type = AttackTypes.Physical;
        this.MeleeAttack = a;
        let r = new Attack();
        r.Name = 'Bite';
        r.BaseAccuracy = .5;
        r.Damage = 2;
        r.Number = 2;
        r.Type = AttackTypes.Physical;
        this.RangedAttack = r;

        this.Summoner = true;
        // this.SummonList.push(UnitTypes.ant);
        // this.SummonList.push(UnitTypes.fly);

    }
}