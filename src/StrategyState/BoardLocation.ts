import { C } from "../C";
import { Board, LocationTypes } from "./Board";

export class BoardLocation {
    b:Board;
    type:LocationTypes;
    s:Phaser.GameObjects.Sprite;

    constructor(b:Board, x:number, y:number, type:LocationTypes = LocationTypes.Land) {
        this.b = b;
        this.s = b.gs.add.sprite(C.LocationWidth * x, C.LocationHeight * y, 'tiletemp').setDepth(y);
        if(type == LocationTypes.Edge) 
            this.s.alpha = .5;
    }
}