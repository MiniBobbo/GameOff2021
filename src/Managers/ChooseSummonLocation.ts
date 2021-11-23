import { C } from "../C";
import { UnitTypes } from "../Entity/Unit";
import { SceneEvents } from "../scene/GameScene";
import { BoardLocation, BoardLocationEvents } from "../StrategyScene/BoardLocation";
import { State } from "./State";
import { StateTypes } from "./StateManager";

export class ChooseSummonLocation extends State {
    private selectedType:UnitTypes;

    EnterState(e:UnitTypes) {

        //The chosen unit should be in the this.m.PrimaryUnit location.  Check movement from there.
        let xx = this.m.PrimaryUnit.xx;
        let yy = this.m.PrimaryUnit.yy;

        this.selectedType = e;

        let board = this.m.gs.b;
        board.FindMoveLocations(board.locations[xx][yy], 1, false);
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

    }

    clicked(location:BoardLocation) {
        if(location.highlighted) {
            let board = this.m.gs.b;
            // let s = board.CreateUnit(UnitFactory.CreateUnit(this.selectedType, this.gs.CurrentPlayer), location.xx, location.yy);
            // s.InteractComplete();
            // s.MoveComplete();
            // board.MoveUnit(this.m.PrimaryUnit, location.xx, location.yy);
            // this.m.PrimaryUnit.emit(UnitSpriteEvents.MoveComplete);
        }
        this.gs.events.emit(SceneEvents.ClearHighlights);
        this.m.ChangeState(StateTypes.Selection);
    }

    LeaveState() {
        this.gs.events.removeListener(SceneEvents.Clicked);
        this.selectedType = null;

    }

}