import { SceneEvents } from "../scene/GameScene";
import { Board } from "../StrategyScene/Board";
import { BoardLocationEvents, BoardLocation } from "../StrategyScene/BoardLocation";
import { UnitSpriteEvents } from "../StrategyScene/UnitSprite";
import { State } from "./State";
import { StateTypes } from "./StateManager";

export class ChooseMoveLocation extends State {
    EnterState() {
        //The chosen unit should be in the this.m.PrimaryUnit location.  Check movement from there.
        let xx = this.m.PrimaryUnit.xx;
        let yy = this.m.PrimaryUnit.yy;

        let board = this.m.gs.b;
        board.FindMoveLocations(board.locations[xx][yy], 4, false);
        for(let x = 1; x < board.Width + 1; x++) {
            for(let y = 1; y < board.Height + 1; y++) {
                if(board.floodFillLocations[x][y] >=0) {
                    //These locations should be highlighted...
                    if(board.locations[x][y].UnitSprite != null)
                        board.locations[x][y].s.emit(BoardLocationEvents.Highlight, 0xff0000);
                    else
                    board.locations[x][y].s.emit(BoardLocationEvents.Highlight, 0x0000ff);
                }
            }
        }
        this.gs.events.on(SceneEvents.Clicked, this.clicked, this);


    }

    clicked(location:BoardLocation) {
        if(location.highlighted) {
            let board = this.m.gs.b;
            board.MoveUnit(this.m.PrimaryUnit, location.xx, location.yy);
            this.m.PrimaryUnit.emit(UnitSpriteEvents.MoveComplete);
        }
        this.gs.events.emit(SceneEvents.ClearHighlights);
        this.m.ChangeState(StateTypes.Selection);
    }

    LeaveState() {
        this.gs.events.removeListener(SceneEvents.Clicked, this.clicked, this);

    }
}