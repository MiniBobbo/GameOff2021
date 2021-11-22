import { SceneEvents } from "../../scene/GameScene";
import { BoardLocation, BoardLocationEvents } from "../../StrategyScene/BoardLocation";
import { State } from "../State";
import { StateTypes } from "../StateManager";

export class ChooseTargetState extends State {
    EnterState() {
        //The chosen unit should be in the this.m.PrimaryUnit location.  Check movement from there.
        
        let xx = this.m.PrimaryUnit.xx;
        let yy = this.m.PrimaryUnit.yy;

        let board = this.m.gs.b;
        board.FindMoveLocations(board.locations[xx][yy], 1, true);
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
        if(location.highlighted && location.UnitSprite != null && location.UnitSprite.u.ControllingPlayer != this.gs.CurrentPlayer) {
            this.gs.SecondaryUnitSatus.LoadUnit(location.UnitSprite.u);
            this.m.ChangeState(StateTypes.ChooseMeleeOrRanged);
            return;
        }
        this.gs.events.emit(SceneEvents.ClearHighlights);
        this.m.ChangeState(StateTypes.Selection);
    }

    LeaveState() {
        this.gs.events.emit(SceneEvents.ClearHighlights);
        this.gs.events.removeListener(SceneEvents.Clicked);
        this.gs.events.removeListener(SceneEvents.HoverLeave);
        this.gs.events.removeListener(SceneEvents.HoverOver);
    }
}