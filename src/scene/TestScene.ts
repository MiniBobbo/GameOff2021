import { UnitStatus } from "../Controls/UnitStatus";
import { UnitTypes } from "../Entity/Unit";
import { UnitFactory } from "../Factories/UnitFactory";
import { Board } from "../StrategyState/Board";
import { GameScene } from "./GameScene";

export class TestScene extends GameScene {
    b:Board;
    create() {
        this.cameras.main.setBackgroundColor(0x999999);
        this.b = new Board(this, 10,10);
    }

    update(time:number, dt:number) {
        
    }
}