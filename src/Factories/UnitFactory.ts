import { Attack, AttackTypes } from "../Entity/Attack";
import { Player } from "../Entity/Player";
import { MovementTypes, Unit, UnitTypes } from "../Entity/Unit";

export class UnitFactory {
    static CreateUnit(u:UnitTypes, p:Player):Unit {
        let unit:Unit = new Unit();
        let melee = new Attack();
        let ranged = new Attack();

        switch (u) {
            case UnitTypes.queenbee:
                unit.Name = 'Queen Bee';
                unit.MaxHP = unit.CurrentHP = 100;
                unit.Armor = 3;
                unit.MagicResist = 5;
                unit.Movement = 3;
                unit.MovementType = MovementTypes.Flight;
                melee.Name = 'Strike';
                melee.BaseAccuracy = .4;
                melee.Damage = 4;
                melee.Number = 2;
                melee.Type = AttackTypes.Physical;
                unit.MeleeAttack = melee;
                unit.Summoner = true;
                unit.SummonList.push(UnitTypes.ant);
                unit.SummonList.push(UnitTypes.fly);
            break;
            case UnitTypes.ant:
                unit.Name = 'Ant';
                unit.MaxHP = unit.CurrentHP = 35;
                unit.Armor = 1;
                unit.MagicResist = 1;
                unit.Movement = 5;
                melee.Name = 'Hittem';
                melee.BaseAccuracy = .5;
                melee.Damage = 5;
                melee.Number = 2;
                melee.Type = AttackTypes.Physical;
                unit.MeleeAttack = melee;
                unit.SummonCost = 25;
                break;
            case UnitTypes.fly:
                unit.Name = 'Fly';
                unit.MaxHP = unit.CurrentHP = 25;
                unit.Armor = 1;
                unit.MagicResist = 1;
                unit.Movement = 6;
                let a2 = new Attack();
                a2.Name = 'Stab';
                a2.BaseAccuracy = .7;
                a2.Damage = 3;
                a2.Number = 2;
                a2.Type = AttackTypes.Physical;
                unit.MeleeAttack = a2;
                unit.SummonCost = 20;
                break;
            case UnitTypes.roachking:
                // unit = new RoachKing();
                unit.MaxHP = unit.CurrentHP = 80;
                unit.Armor = 4;
                unit.MagicResist = 4;
                unit.Movement = 3;
                unit.MovementType = MovementTypes.Ground;
                melee.Name = 'Bite';
                melee.BaseAccuracy = .5;
                melee.Damage = 2;
                melee.Number = 2;
                melee.Type = AttackTypes.Physical;
                unit.MeleeAttack = melee;
                let r = new Attack();
                r.Name = 'Bite';
                r.BaseAccuracy = .5;
                r.Damage = 2;
                r.Number = 2;
                r.Type = AttackTypes.Physical;
                unit.RangedAttack = r;
        
                unit.Summoner = true;
                unit.SummonList.push(UnitTypes.ant);
                unit.SummonList.push(UnitTypes.fly);
        
            break;
            default:
                break;
        }
        unit.Type = u;
        unit.ControllingPlayer = p;

        return unit;
    }

}