import { UnitStatus } from "../Controls/UnitStatus";
import { Player } from "../Entity/Player";
import { UnitTypes } from "../Entity/Unit";
import { UnitFactory } from "../Factories/UnitFactory";
import { StateTypes } from "../Managers/StateManager";
import { Board } from "../StrategyScene/Board";
import { BoardLocation } from "../StrategyScene/BoardLocation";
import { UnitSprite } from "../StrategyScene/UnitSprite";
import { GameScene, SceneEvents } from "./GameScene";

export class TestScene extends GameScene {
    t:Phaser.GameObjects.BitmapText;

    create() {
        super.create();
        // this.cameras.main.setBackgroundColor(0x999999);
        this.b = new Board(this, 10,10);

        this.CreatePlayers();


        this.t = this.add.bitmapText(80,230,'6px', '').setScrollFactor(0,0).setDepth(500).setDropShadow(1,1,0,1);
        // let us = new UnitSprite(this);

        let u = UnitFactory.CreateUnit(UnitTypes.ant, this.CurrentPlayer);
        let u2 = UnitFactory.CreateUnit(UnitTypes.ant, this.CurrentPlayer);
        this.b.CreateUnit(u, 1,1);
        this.b.CreateUnit(u2, 5,6);
        this.b.CreateUnit(UnitFactory.CreateUnit(UnitTypes.roachking, this.CurrentPlayer), 2,2);
        
        this.b.CreateUnit(UnitFactory.CreateUnit(UnitTypes.fly, this.Players[1]), 7,7);
        this.b.CreateUnit(UnitFactory.CreateUnit(UnitTypes.fly, this.Players[1]), 6,6);
        this.time.addEvent({
            delay:500,
            callback:() => {this.events.emit(SceneEvents.Finished);},
            callbackScope:this
        });

        this.events.on(SceneEvents.ChangeState, (s:StateTypes) => { this.t.text = `State: ${StateTypes[s]}`});

        this.StartPlayersTurn(this.Players[0]);
    }

    CreatePlayers() {
        //Create players.
        this.AddPlayer('Good Team', 0xff0000);
        this.AddPlayer('Bad Team', 0x3333ff);
        this.CurrentPlayer = this.Players[0];



    }

    // update(time:number, dt:number) {

    // }
}