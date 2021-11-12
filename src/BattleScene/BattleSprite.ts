import { BattleScene } from "../scene/BattleScene";

export class BattleSprite {
    s:Phaser.GameObjects.Sprite;
    bs:BattleScene;

    constructor(bs:BattleScene) {
        this.bs = bs;
        this.s = bs.add.sprite(200,200, 'atlas', 'ant_stand_0');
        
    }
}