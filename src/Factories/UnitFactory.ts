import { Attack, AttackTypes } from "../Entity/Attack";
import { Player } from "../Entity/Player";
import { Unit, UnitTypes } from "../Entity/Unit";
import { GameScene } from "../scene/GameScene";
import { UnitSprite } from "../StrategyScene/UnitSprite";

export class UnitFactory {
    static CreateUnit(u:UnitTypes, p:Player):Unit {
        let unit:Unit = new Unit();
        unit.Type = u;
        unit.ControllingPlayer = p;
        switch (u) {
            case UnitTypes.ant:
                unit.Name = 'Ant';
                unit.MaxHP = unit.CurrentHP = 35;
                unit.Armor = 1;
                unit.MagicResist = 1;
                unit.Movement = 5;
                unit.Skills = [];
                let a = new Attack();
                a.Name = 'Hittem';
                a.BaseAccuracy = .5;
                a.Damage = 5;
                a.Number = 2;
                a.Type = AttackTypes.Physical;
                unit.MeleeAttack = a;
                break;
            case UnitTypes.bug:
                unit.Name = 'Bug';
                unit.MaxHP = unit.CurrentHP = 35;
                unit.Armor = 1;
                unit.MagicResist = 1;
                unit.Movement = 5;
                unit.Skills = [];
                let a2 = new Attack();
                a2.Name = 'Hittem';
                a2.BaseAccuracy = .5;
                a2.Damage = 5;
                a2.Number = 2;
                a2.Type = AttackTypes.Physical;
                unit.MeleeAttack = a2;
                break;
            default:
                break;
        }
        return unit;
    }

}