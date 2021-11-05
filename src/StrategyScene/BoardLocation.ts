import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { C } from "../C";
import { SceneEvents } from "../scene/GameScene";
import { Board, LocationTypes } from "./Board";
import { UnitSprite } from "./UnitSprite";

export class BoardLocation {
    b:Board;
    type:LocationTypes;
    s:Phaser.GameObjects.Sprite;
    x:number;
    xx:number;
    y:number;
    yy:number;
    UnitSprite:UnitSprite;

    constructor(b:Board, xx:number, yy:number, type:LocationTypes = LocationTypes.Land) {
        this.b = b;
        this.s = b.gs.add.sprite(C.LocationWidth * xx, C.LocationHeight * yy, 'tiletemp').setDepth(yy);
        if(type == LocationTypes.Edge) 
            this.s.alpha = .5;
        this.s.setOrigin(.5,.8);

        this.xx = xx;
        this.yy = yy;

        this.x = this.s.x;
        this.y = this.s.y;

        this.s.setInteractive();
        this.s.on('pointerover', () => {b.gs.events.emit(SceneEvents.HoverOver, this);});
        this.s.on('pointerout', () => {b.gs.events.emit(SceneEvents.HoverLeave);});
        this.s.on('pointerdown', () => {b.gs.events.emit(SceneEvents.Clicked, this);});
        this.s.on('destroy', this.Destroy, this);

    }

    Destroy() {
        this.s.removeAllListeners();
    }
}