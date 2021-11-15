import { Unit } from "../Entity/Unit";
import { BattleScene } from "../scene/BattleScene";

export class BattleSprite {
    s:Phaser.GameObjects.Sprite;
    bs:BattleScene;

    u:Unit;

    constructor(bs:BattleScene) {
        this.bs = bs;
        this.s = bs.add.sprite(200,200, 'atlas', 'ant_stand_0');
        this.s.on('attack', () => {
            //TODO: Run finished when the attack animation finishes.  Animations in general.

        });
    }

    SetUnit(u:Unit) {
        this.u = u;
    }
}