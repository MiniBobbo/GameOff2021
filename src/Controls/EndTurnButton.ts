import { GameScene, SceneEvents } from "../scene/GameScene";

export class EndTurnButton {
    t:Phaser.GameObjects.Image;
    text:Phaser.GameObjects.BitmapText;
    gs:GameScene;
    defaultX:number = 190;
    defaultY:number = 204;

    constructor(gs:GameScene) {
        this.gs = gs;
        this.t = gs.add.image(this.defaultX, this.defaultY, 'atlas', 'EndTurnButton')
        .setDepth(10)
        .setScrollFactor(0)
        .setOrigin(0)
        .setInteractive();

        this.text = gs.add.bitmapText(this.defaultX+2, this.defaultY+1, '8px', "End Turn")
        .setDepth(20)
        .setScale(2)
        .setScrollFactor(0)
        .setInteractive()
        .setOrigin(0);
        
        this.text.on('pointerover', () => {this.text.setTint(0xff0000)}, this)
        this.text.on('pointerout', () => {this.text.setTint(0xffffff)}, this)

        this.t.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {
            console.log('End turn');
            gs.events.emit(SceneEvents.EndTurn); 
            e.stopPropagation();}, this);
        this.gs.events.on(SceneEvents.DisableEndTurn, () => { 
            this.t.setPosition(-1000,-100);
            this.text.setPosition(-1000,-100);
        }, this);
        this.gs.events.on(SceneEvents.EnableEndTurn, () => { 
            this.t.setPosition(this.defaultX,this.defaultY);
            this.text.setPosition(this.defaultX+2, this.defaultY+1);
        }, this);
    }

    Destroy() {
        this.t.removeListener('pointerdown');
    }
}