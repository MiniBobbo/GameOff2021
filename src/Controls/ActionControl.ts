import { GameScene, SceneEvents } from "../scene/GameScene";
import { BoardLocation } from "../StrategyScene/BoardLocation";

export class ActionControl extends Phaser.GameObjects.Container {
    gs:GameScene;
    MoveAction:Phaser.GameObjects.BitmapText;
    constructor(gs:GameScene) {
        super(gs);
        this.gs = gs;
        this.scene.add.existing(this);
        this.x = -1000;
        this.y = -1000;

        this.MoveAction = gs.add.bitmapText(0,-45, '6px', 'Move').setInteractive();
        this.MoveAction.on('pointerover', () => {this.MoveAction.setTint(0xff0000);});
        this.MoveAction.on('pointerout', () => {this.MoveAction.setTint(0xffffff);});
        this.MoveAction.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {gs.events.emit(SceneEvents.ClickedAction, ActionTypes.Move); e.stopPropagation();});
        this.add(this.MoveAction);
    }

    Activate(bl:BoardLocation) {
        // this.setScale(.1);
        // this.gs.tweens.add({
        //     targets:this,
        //     scaleX:1,
        //     scaleY:1,
        //     duration:100
        // });
        this.setPosition(bl.x, bl.y);
    }

    Deactivate() {
        this.setPosition(-1000,-1000);
    }
}

export enum ActionTypes {
    Move = 'move',
    Cancel = 'cancel'
}