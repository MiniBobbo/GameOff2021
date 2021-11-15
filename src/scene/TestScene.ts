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
    t:Phaser.GameObjects.Text;

    create() {
        super.create();
        // this.cameras.main.setBackgroundColor(0x999999);
        this.b = new Board(this, 10,10);

        this.CreatePlayers();


        this.t = this.add.text(0,0,'').setScrollFactor(0,0).setDepth(500);
        // let us = new UnitSprite(this);

        let u = UnitFactory.CreateUnit(UnitTypes.ant, this.CurrentPlayer);
        let u2 = UnitFactory.CreateUnit(UnitTypes.ant, this.CurrentPlayer);
        this.b.CreateUnit(u, 1,1);
        this.b.CreateUnit(u2, 5,6);
        
        this.b.CreateUnit(UnitFactory.CreateUnit(UnitTypes.ant, this.Players[1]), 7,7);
        this.b.CreateUnit(UnitFactory.CreateUnit(UnitTypes.ant, this.Players[1]), 6,6);
        this.time.addEvent({
            delay:500,
            callback:() => {this.events.emit(SceneEvents.Finished);},
            callbackScope:this
        });

        this.events.on(SceneEvents.ChangeState, (s:StateTypes) => { this.t.text = `State: ${StateTypes[s]}`});

        this.scene.launch('battle', {attacker:u, defender:u2});

        // this.events.on(SceneEvents.Debug, (message:string) => { 
        //     this.t.text = message; 
        //     this.next = true;}, 
        //     this);

    }

    CreatePlayers() {
        //Create players.
        this.AddPlayer('Good Team', 0xff00ff);
        this.AddPlayer('Bad Team', 0xff0000);
        this.CurrentPlayer = this.Players[0];



    }

    update(time:number, dt:number) {

    }
}