import { Unit } from "../Entity/Unit";
import { BattleScene, BattleSceneEvents } from "../scene/BattleScene";
import { GameScene } from "../scene/GameScene";

export class BattleSprite {
    s:Phaser.GameObjects.Sprite;
    bs:GameScene;

    u:Unit;

    constructor(bs:GameScene) {
        this.bs = bs;
        this.s = bs.add.sprite(200,200, 'atlas', 'ant_stand_0');
        this.s.on('attack', () => {
            //TODO: Run finished when the attack animation finishes.  Animations in general.
            this.bs.time.addEvent({
                delay:500,
                callback:() => {this.bs.events.emit(BattleSceneEvents.ResolveAttack);},
                callbackScope:this                

            });
        });
    }

    SetUnit(u:Unit) {
        this.u = u;
    }

    PlayAnimation(anim:string) {
        this.s.play(`${this.u.Name}_${anim}`, true);
    }
}