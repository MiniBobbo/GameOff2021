import { GameScene, SceneEvents } from "../scene/GameScene";

export class EndTurnButton {
    t:Phaser.GameObjects.Image;
    gs:GameScene;
    defaultX:number = 300;
    defaultY:number = 5;

    constructor(gs:GameScene) {
        this.gs = gs;
        this.t = gs.add.image(this.defaultX, this.defaultY, 'endturn')
        .setScrollFactor(0)
        .setOrigin(0)
        .setScale(2)
        .setInteractive();

        this.t.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {
            console.log('End turn');
            gs.events.emit(SceneEvents.EndTurn); 
            e.stopPropagation();}, this);
        this.gs.events.on(SceneEvents.DisableEndTurn, () => { this.t.setPosition(-1000,-100);}, this);
        this.gs.events.on(SceneEvents.EnableEndTurn, () => { this.t.setPosition(this.defaultX,this.defaultY);}, this);
    }

    Destroy() {
        this.t.removeListener('pointerdown');
    }
}