import { UnitFactory } from "../Factories/UnitFactory";
import { GameScene, SceneEvents } from "../scene/GameScene";
import { BoardLocation } from "../StrategyScene/BoardLocation";

export class SummonControl extends Phaser.GameObjects.Container {
    gs:GameScene;
    icons:Array<Phaser.GameObjects.Image>;
    constructor(gs:GameScene) {
        super(gs);
        this.gs = gs;
        this.scene.add.existing(this);
        this.x = -1000;
        this.y = -1000;
        this.icons = [];

    }

    Activate(bl?:BoardLocation, x?:number, y?:number) {
        this.setScale(.1);
        this.gs.tweens.add({
            targets:this,
            scaleX:1,
            scaleY:1,
            duration:100
        });
        if(bl != null) 
            this.setPosition(bl.x, bl.y-10);
        else
            this.setPosition(x, y);

        //Create a unit for each of the summonable units for the current player.  Then place them in a circle around the board location.
        let circle = new Phaser.Geom.Circle(0,0,30);

        bl.UnitSprite.u.SummonList.forEach(element => {
            let icon = this.gs.add.image(0,0,'atlas');
            if(icon.texture.has(`boardsprites_${element}_0`))
                icon.setFrame(`boardsprites_${element}_0`);
            else 
                icon.setFrame(`boardsprites_ant_0`);
            icon.setInteractive();
            this.add(icon);
            this.icons.push(icon);
            icon.setTint(0x9999ff);

            let u = UnitFactory.CreateUnit(element, this.gs.CurrentPlayer);
            //Place the listeners for this icon.
            if(this.gs.CurrentPlayer.CurrentMP >= u.SummonCost) {
                icon.on('pointerover', () => {icon.setTint(0xff0000);});
                icon.on('pointerout', () => {icon.setTint(0x9999ff);});
                icon.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {this.gs.events.emit(SceneEvents.SummonCreature, element); e.stopPropagation();});
                icon.alpha = 1;
            } else {
                icon.alpha = .5;
            }
        });

        Phaser.Actions.PlaceOnCircle(this.icons, circle);


        // if(bl.UnitSprite.MoveAction) {
        //     this.MoveAction.on('pointerover', () => {this.MoveAction.setTint(0xff0000);});
        //     this.MoveAction.on('pointerout', () => {this.MoveAction.setTint(0xffffff);});
        //     this.MoveAction.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {this.gs.events.emit(SceneEvents.ClickedAction, ActionTypes.Move); e.stopPropagation();});
        //     this.MoveAction.alpha = 1;
        // } else {
        //     this.MoveAction.alpha = .5;
        // }
    }

    Deactivate() {
        this.icons.forEach(element => {
            element.removeListener('pointerover');
            element.removeListener('pointerdown');
            element.removeListener('pointerout');
            element.destroy();
        });

        this.icons = [];

        // this.MoveAction.removeListener('pointerover');
        // this.MoveAction.removeListener('pointerout');
        // this.MoveAction.removeListener('pointerdown');
        // this.MoveAction.setTint(0xffffff);
        // this.AttackAction.removeListener('pointerover');
        // this.AttackAction.removeListener('pointerout');
        // this.AttackAction.removeListener('pointerdown');
        // this.AttackAction.setTint(0xffffff);
    this.setPosition(-1000,-1000);
    }
}

export enum ActionTypes {
    Move = 'move',
    Cancel = 'cancel',
    Attack = 'attack',
    Summon = 'summon',
}