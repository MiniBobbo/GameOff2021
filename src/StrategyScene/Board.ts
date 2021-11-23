import { visitLexicalEnvironment } from "typescript";
import { C } from "../C";
import { UnitStatus } from "../Controls/UnitStatus";
import { Player } from "../Entity/Player";
import { Unit } from "../Entity/Unit";
import { GameScene } from "../scene/GameScene";
import { BoardLocation } from "./BoardLocation";
import { UnitSprite } from "./UnitSprite";

export class Board {
    gs:GameScene;
    locations:Array<Array<BoardLocation>>;
    AllLocations:Array<BoardLocation>;
    locationSprites:Array<Phaser.GameObjects.Sprite>;
    Width:number;
    Height:number;
    floodFillLocations:Array<Array<number>>;
    AllUnitSprites:Array<UnitSprite>;


    constructor(gs:GameScene, width:number, height:number) {
        this.gs = gs;
        this.locations = [];
        this.floodFillLocations = [];
        this.locationSprites = [];
        this.AllLocations = [];
        this.AllUnitSprites = [];
        this.Width = width;
        this.Height = height;
        this.CreateLocations();

        this.gs.events.on(BoardEvents.Create, this.CreateUnit, this);
        
    }

    Dispose() {
        this.gs.events.removeListener(BoardEvents.Create, this.CreateUnit, this);
    }

    CreateUnit(u:Unit, xx:number, yy:number):UnitSprite {
        let s = new UnitSprite(this.gs);
        s.AddUnit(u);
        s.x = C.TtW(xx);
        s.y = C.TtW(yy);
        s.xx = xx;
        s.yy = yy;
        // s.s.setTint(s.u.ControllingPlayer.TeamColor);
        this.locations[xx][yy].UnitSprite = s; 
        this.AllUnitSprites.push(s);
        return s;
    }

    MoveUnit(unit:UnitSprite, xx:number, yy:number) {
        //Check if the spot is available.
        if(this.locations[xx][yy].UnitSprite != null) {
            //Somehow we are trying to move a unit onto a spot that already contains a unit.
            //This shouldn't happen as it is handled in the highlighting phase, but this check will 
            //help me find a problem where I forget to reset a flag or something...
            console.log(`Trying to move unit ${unit.name} into location ${xx}, ${yy} which already contains ${this.locations[xx][yy].UnitSprite.name}`);
            return;
        } 
        //Clear the unit's current location
        this.locations[unit.xx][unit.yy].UnitSprite = null;
        //Load the unit into the new location
        this.locations[xx][yy].UnitSprite = unit;

        unit.yy = yy;
        unit.xx = xx;

        //Move the sprite.
        // this.gs.tweens.add({
        //     targets:unit.s,
        //     x:this.locations[xx][yy].x, 
        //     y:this.locations[xx][yy].y,
        //     duration:300
        // });
            unit.x = this.locations[xx][yy].x; 
            unit.y = this.locations[xx][yy].y;

    }

    CreateLocations() {
        //we create an extra location around the entire board so:
        //1. The the locations are 1 based instead of 0 based (this might come back to bite me...)
        //2.  When we do pathfinding I can mark all the unwalkable pieces as Edge so I don't need tocheck for array overflows.
        for(let x = 0; x < this.Width+2; x++) {
            this.locations[x] = [];
            this.floodFillLocations[x] = [];
            for(let y = 0; y < this.Height+2; y++) {
                let edge = false;
                if(x==0||y==0||x==this.Height+1||y==this.Height+1)
                    edge = true;
                let l = this.locations[x][y] = new BoardLocation(this, x,y,edge ? LocationTypes.Edge : LocationTypes.Grass);
                this.floodFillLocations[x][y] = edge?-99:0;
                this.locationSprites.push(l.s);
                this.AllLocations.push(l);
                this.gs.LocationLayer.add(l.s);
            }
        }
    }

    GetUnitSprite(id:number):UnitSprite {
        let us:UnitSprite;
        for(let i =0; i < this.AllUnitSprites.length; i++) {
            if(this.AllUnitSprites[i].u.ID == id)
            return this.AllUnitSprites[i];
        }
        return null;
        // return this.AllUnitSprites.find(e=>{e.u.ID == id});
    }
    GetLocationBySpriteID(id:number):BoardLocation {
        for(let i =0; i < this.AllLocations.length; i++) {
            if(this.AllLocations[i].UnitSprite != null && this.AllLocations[i].UnitSprite.u.ID == id)
            return this.AllLocations[i];
        }
        return null;
        // return this.AllUnitSprites.find(e=>{e.u.ID == id});
    }



    KillUnitSprite(id:number) {
        let u = this.GetUnitSprite(id);
        let b = this.GetLocationBySpriteID(id);
        //Hide the unit
        this.gs.tweens.add({
            targets:u,
            alpha:0,
            duration:500
        });
        //Clear the board location
        b.UnitSprite = null;
    }

    /**
     * Finds all the move locations from a particular spot.  Uses a basic flood fill to check all the available locations
     * @param bl The board location that we should start searching from.
     * @param move The range that should be checked
     * @param targetUnits Should locations that currently have units be targetted?  
     */
    FindMoveLocations(bl:BoardLocation, move:number, targetUnits:boolean = false) {
        let testLocations:Array<{x:number, y:number}> = [];
        for(let x = 1; x < this.Width+1; x++) {
            for(let y = 1; y < this.Width+1; y++) {
                this.floodFillLocations[x][y] = -1;
            }
        }
        this.floodFillLocations[bl.xx][bl.yy] = move;
        this.testLocation(move, bl.xx-1, bl.yy, testLocations, targetUnits);
        this.testLocation(move, bl.xx+1, bl.yy, testLocations, targetUnits);
        this.testLocation(move, bl.xx, bl.yy-1, testLocations, targetUnits);
        this.testLocation(move, bl.xx, bl.yy+1, testLocations, targetUnits);


        while(testLocations.length > 0) {
            var test = testLocations.shift();
            var currentMove = this.floodFillLocations[test.x][test. y];
            this.testLocation(currentMove, test.x-1, test.y, testLocations, targetUnits);
            this.testLocation(currentMove, test.x+1, test.y, testLocations, targetUnits);
            this.testLocation(currentMove, test.x, test.y-1, testLocations, targetUnits);
            this.testLocation(currentMove, test.x, test.y+1, testLocations, targetUnits);
        }
    }

    /**
     * Tests an individual location to see if it can be traversed.  
     * @param move The current move.  
     * @param xx The Tile location's X position
     * @param yy The Tile location's Y p;osition
     * @param testLocations An array of all the testable areas.  This function will append this location to this list if 
     * it is a valid location
     * @param targetUnits Should spaces with units occupying them be added to the list?  Not needed for movement, but 
     * I may wany spells or other things to pick units.
     */
    private testLocation(move:number, xx:number, yy:number, testLocations:Array<{x:number, y:number}>, targetUnits:boolean) {
        if(this.floodFillLocations[xx][yy] != -99) {
            //Find the new movement value
            move -= 1;
            if(move >= 0 && move > this.floodFillLocations[xx][yy] && (targetUnits || this.locations[xx][yy].UnitSprite == null)) {
                this.floodFillLocations[xx][yy] = move;
                testLocations.push({x:xx, y:yy});
            }
        }
    }
}

export enum LocationTypes {
    Grass = 'grass',
    Edge = 'edge'
}

export enum BoardEvents {
    Create = "Create Unit",
    Move = "Move Unit"
}