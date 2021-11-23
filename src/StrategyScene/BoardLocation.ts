import { C } from "../C";
import { SceneEvents } from "../scene/GameScene";
import { Board, LocationTypes } from "./Board";
import { UnitSprite } from "./UnitSprite";

export class BoardLocation {
    b:Board;
    type:LocationTypes;
    s:Phaser.GameObjects.Sprite;
    h:Phaser.GameObjects.Sprite;
    x:number;
    xx:number;
    y:number;
    yy:number;
    UnitID:number = -1;
    UnitSprite:UnitSprite;
    highlighted:boolean = false;

    constructor(b:Board, xx:number, yy:number, type:LocationTypes = LocationTypes.Grass) {
        this.b = b;
        this.s = b.gs.add.sprite(C.LocationWidth * xx, C.LocationHeight * yy, 'atlas').setDepth(yy);
        this.h = b.gs.add.sprite(C.LocationWidth * xx, C.LocationHeight * yy - 6, 'atlas', 'boardtiles_highlight_0').setDepth(yy+.5).setVisible(false).setAlpha(.5);
        if(type == LocationTypes.Edge) 
            this.s.alpha = 0;
        this.SetFrame(xx,yy, type);
        
        this.s.setOrigin(.5,.8);

        this.xx = xx;
        this.yy = yy;

        this.x = this.s.x;
        this.y = this.s.y;

        this.s.setInteractive();
        this.s.on('pointerover', () => {b.gs.events.emit(SceneEvents.HoverOver, this);});
        this.s.on('pointerout', () => {b.gs.events.emit(SceneEvents.HoverLeave);});
        this.s.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {b.gs.events.emit(SceneEvents.Clicked, this);
        e.stopPropagation();});
        this.s.on('destroy', this.Destroy, this);
        this.s.on(BoardLocationEvents.Highlight, (color:number)=>{this.highlighted = true; this.h.setTint(color).setVisible(true)}, this);
        this.b.gs.events.on(SceneEvents.ClearHighlights, () => {this.highlighted = false; this.h.setVisible(false)});

    }
    SetFrame(xx: number, yy: number, type: LocationTypes) {
        let suffix = this.isEven(xx+yy)? 0:1;
        this.s.setFrame(`boardtiles_${type}_${suffix}`);

    }

    isEven(n:number) {
        return n % 2 == 0;
     }

    Destroy() {
        this.s.removeAllListeners();
        this.b.gs.events.removeListener(SceneEvents.ClearHighlights);
    }

}
export enum BoardLocationEvents {
    Highlight = 'highlight'

    
}
