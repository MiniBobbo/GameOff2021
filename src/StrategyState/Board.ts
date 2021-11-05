import { GameScene } from "../scene/GameScene";
import { BoardLocation } from "./BoardLocation";

export class Board {
    gs:GameScene;
    locations:Array<Array<BoardLocation>>;
    locationSprites:Array<Phaser.GameObjects.Sprite>;
    Width:number;
    Height:number;


    constructor(gs:GameScene, width:number, height:number) {
        this.gs = gs;
        this.locations = [];
        this.locationSprites = [];
        this.Width = width;
        this.Height = height;
        this.CreateLocations();
    }

    CreateLocations() {
        //we create an extra location around the entire board so:
        //1. The the locations are 1 based instead of 0 based (this might come back to bite me...)
        //2.  When we do pathfinding I can mark all the unwalkable pieces as Edge so I don't need to search for edges.
        for(let x = 0; x < this.Width+2; x++) {
            this.locations[x] = [];
            for(let y = 0; y < this.Height+2; y++) {
                let edge = false;
                if(x==0||y==0||x==this.Height+1||y==this.Height+1)
                    edge = true;
                let l = this.locations[x][y] = new BoardLocation(this, x,y,edge ? LocationTypes.Edge : LocationTypes.Land);
                this.locationSprites.push(l.s);
                
            }
        }
    }

    
    
}

export enum LocationTypes {
    Land,
    Edge
}
