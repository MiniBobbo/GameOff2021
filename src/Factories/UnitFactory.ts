import { Unit, UnitTypes } from "../Entity/Unit";
import { GameScene } from "../scene/GameScene";
import { UnitSprite } from "../StrategyScene/UnitSprite";

export class UnitFactory {
    static CreateUnit(u:UnitTypes):Unit {
        let unit:Unit = new Unit();
        unit.Type = u;
        switch (u) {
            case UnitTypes.TestUnit:
                unit.Name = 'Test Unit';
                unit.MaxHP = unit.CurrentHP = 10;
                unit.Armor = 1;
                unit.MagicResist = 1;
                unit.Movement = 5;
                unit.Skills = [];
                break;
        
            default:
                break;
        }
        return unit;
    }

}