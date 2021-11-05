import { GameScene, SceneEvents } from "../scene/GameScene";
import { BoardLocation } from "../StrategyScene/BoardLocation";

export class ActionControl extends Phaser.GameObjects.Container {
    MoveAction:Phaser.GameObjects.BitmapText;
    constructor(gs:GameScene) {
        super(gs);
        this.scene.add.existing(this);
        this.x = -1000;
        this.y = -1000;

        this.MoveAction = gs.add.bitmapText(0,-45, '6px', 'Move').setInteractive();
        this.MoveAction.on('pointerover', () => {this.MoveAction.setTint(0xff0000);});
        this.MoveAction.on('pointerout', () => {this.MoveAction.setTint(0xffffff);});
        this.MoveAction.on('pointerdown', () => {gs.events.emit(SceneEvents.ClickedAction, ActionTypes.Move);});
        this.add(this.MoveAction);
    }

    Activate(bl:BoardLocation) {
        
    }

    Deactivate() {

    }
}

export enum ActionTypes {
    Move = 'move'
}