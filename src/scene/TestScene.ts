import { UnitStatus } from "../Controls/UnitStatus";
import { UnitTypes } from "../Entity/Unit";
import { UnitFactory } from "../Factories/UnitFactory";
import { StateTypes } from "../Managers/StateManager";
import { Board } from "../StrategyScene/Board";
import { BoardLocation } from "../StrategyScene/BoardLocation";
import { UnitSprite } from "../StrategyScene/UnitSprite";
import { GameScene, SceneEvents } from "./GameScene";

export class TestScene extends GameScene {
    t:Phaser.GameObjects.Text;

    create() {
        super.create();
        // this.cameras.main.setBackgroundColor(0x999999);
        this.b = new Board(this, 10,10);

        this.t = this.add.text(0,0,'').setScrollFactor(0,0).setDepth(500);
        // let us = new UnitSprite(this);

        let u = UnitFactory.CreateUnit(UnitTypes.TestUnit);
        this.b.CreateUnit(u, 1,1);
        
        this.time.addEvent({
            delay:2000,
            callback:() => {this.events.emit(SceneEvents.Finished);},
            callbackScope:this
        });

        this.events.on(SceneEvents.ChangeState, (s:StateTypes) => { this.t.text = `State: ${StateTypes[s]}`});

        // this.events.on(SceneEvents.Debug, (message:string) => { 
        //     this.t.text = message; 
        //     this.next = true;}, 
        //     this);

    }

    update(time:number, dt:number) {

    }
}