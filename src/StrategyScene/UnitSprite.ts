import { textChangeRangeIsUnchanged } from "typescript";
import { Unit, UnitTypes } from "../Entity/Unit";
import { GameScene } from "../scene/GameScene";

export class UnitSprite extends Phaser.GameObjects.Container {
    s:Phaser.GameObjects.Sprite;
    u:Unit;
    xx:number;
    yy:number;
    
    constructor(gs:GameScene) {
        super(gs, -100,-100);
        gs.add.existing(this);
        gs.UnitLayer.add(this);
        this.s = gs.add.sprite(0,0, 'unittemp').setOrigin(.5,1);
        this.add(this.s); 

        
    }

    AddUnit(u:Unit) {
        this.u = u;
        //TODO : Change the sprite to the correct frame when we know the unit type.
    }




}