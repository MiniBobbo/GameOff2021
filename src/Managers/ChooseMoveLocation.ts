import { C } from "../C";
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
                        board.locations[x][y].s.emit(BoardLocationEvents.Highlight, C.BLUE_HIGHLIGHT);
                    else
                    board.locations[x][y].s.emit(BoardLocationEvents.Highlight, C.RED_HIGHLIGHT);
                }
            }
        }
        this.gs.events.on(SceneEvents.Clicked, this.clicked, this);

        this.gs.events.on(SceneEvents.HoverOver, (u:BoardLocation) => {
            if(u.UnitSprite != null) {
                this.gs.SecondaryUnitSatus.LoadUnit(u.UnitSprite.u);
                this.gs.SecondaryUnitSatus.setVisible(true);
            }
        }, this);
        this.gs.events.on(SceneEvents.HoverLeave, () => {
                this.gs.SecondaryUnitSatus.setVisible(false);
        }, this);

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
        this.gs.events.removeListener(SceneEvents.Clicked);
        this.gs.events.removeListener(SceneEvents.HoverLeave);
        this.gs.events.removeListener(SceneEvents.HoverOver);

    }
}