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
            case UnitTypes.TestUnit:
                unit.Name = 'Test Unit';
                unit.MaxHP = unit.CurrentHP = 10;
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
        
            default:
                break;
        }
        return unit;
    }

}