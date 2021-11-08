import { textChangeRangeIsUnchanged } from "typescript";
import { Unit, UnitTypes } from "../Entity/Unit";
import { GameScene } from "../scene/GameScene";

export class UnitSprite extends Phaser.GameObjects.Container {
    s:Phaser.GameObjects.Sprite;
    u:Unit;
    xx:number;
    yy:number;
    MoveAction:boolean;
    InteractAction:boolean;
    
    constructor(gs:GameScene) {
        super(gs, -100,-100);
        gs.add.existing(this);
        gs.UnitLayer.add(this);
        this.s = gs.add.sprite(0,0, 'unittemp').setOrigin(.5,1);
        this.add(this.s); 
        this.MoveAction = true;
        this.InteractAction = true;
        
        this.on(UnitSpriteEvents.Reset, this.Reset, this);
        this.on(UnitSpriteEvents.MoveComplete, this.MoveComplete, this);
        this.on(UnitSpriteEvents.InteractComplete, this.InteractComplete, this);

    }

    InteractComplete() {
        this.MoveAction = false;
        this.InteractAction = false;
        this.s.alpha = .7;
    }

    MoveComplete() {
        this.MoveAction = false;

        if(this.InteractAction)
            this.s.alpha = .7;
    }

    Reset() {
        this.MoveAction = true;
        this.InteractAction = true;
        this.s.alpha = 1;
    }

    AddUnit(u:Unit) {
        this.u = u;
        //TODO : Change the sprite to the correct frame when we know the unit type.
    }

    Destroy() {
        this.removeAllListeners();
    }

}

export enum UnitSpriteEvents {
    Reset = 'reset',
    MoveComplete = 'movecomplete',
    InteractComplete = 'interactcomplete'
}