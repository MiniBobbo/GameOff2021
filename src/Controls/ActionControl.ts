import { GameScene, SceneEvents } from "../scene/GameScene";
import { BoardLocation } from "../StrategyScene/BoardLocation";

export class ActionControl extends Phaser.GameObjects.Container {
    gs:GameScene;
    MoveAction:Phaser.GameObjects.Image;
    AttackAction:Phaser.GameObjects.Image;
    constructor(gs:GameScene) {
        super(gs);
        this.gs = gs;
        this.scene.add.existing(this);
        this.x = -1000;
        this.y = -1000;

        this.MoveAction = gs.add.sprite(-20,-20, 'atlas', 'icons_boot_0').setInteractive();
        this.add(this.MoveAction);
        this.AttackAction = gs.add.sprite(20,-20, 'atlas', 'icons_sword_0').setInteractive();
        this.add(this.AttackAction);
    }

    Activate(bl:BoardLocation) {
        this.setScale(.1);
        this.gs.tweens.add({
            targets:this,
            scaleX:1,
            scaleY:1,
            duration:100
        });
        this.setPosition(bl.x, bl.y-10);
        if(bl.UnitSprite.MoveAction) {
            this.MoveAction.on('pointerover', () => {this.MoveAction.setTint(0xff0000);});
            this.MoveAction.on('pointerout', () => {this.MoveAction.setTint(0xffffff);});
            this.MoveAction.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {this.gs.events.emit(SceneEvents.ClickedAction, ActionTypes.Move); e.stopPropagation();});
            this.MoveAction.alpha = 1;
        } else {
            this.MoveAction.alpha = .5;
        }
        if(bl.UnitSprite.InteractAction) {
            this.AttackAction.on('pointerover', () => {this.AttackAction.setTint(0xff0000);});
            this.AttackAction.on('pointerout', () => {this.AttackAction.setTint(0xffffff);});
            this.AttackAction.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {this.gs.events.emit(SceneEvents.ClickedAction, ActionTypes.Attack); e.stopPropagation();});
            this.AttackAction.alpha = 1;
        } else {
            this.AttackAction.alpha = .5;
        }

    }

    Deactivate() {
        this.MoveAction.removeListener('pointerover');
        this.MoveAction.removeListener('pointerout');
        this.MoveAction.removeListener('pointerdown');
        this.MoveAction.setTint(0xffffff);
        this.AttackAction.removeListener('pointerover');
        this.AttackAction.removeListener('pointerout');
        this.AttackAction.removeListener('pointerdown');
        this.AttackAction.setTint(0xffffff);
    this.setPosition(-1000,-1000);
    }
}

export enum ActionTypes {
    Move = 'move',
    Cancel = 'cancel',
    Attack = 'attack'
}