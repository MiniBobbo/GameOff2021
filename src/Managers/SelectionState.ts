import { SceneEvents } from "../scene/GameScene";
import { BoardLocation } from "../StrategyScene/BoardLocation";
import { State } from "./State";
import { StateTypes } from "./StateManager";

export class SelectionState extends State {
    EnterState() {
        this.gs.events.on(SceneEvents.Clicked, (bl:BoardLocation) => { 
            if(bl.UnitSprite != null) {
                let s = bl.UnitSprite;
                this.m.PrimaryUnit = bl.UnitSprite;
                this.gs.cameras.main.pan(bl.x, bl.y, 300);
                this.m.ChangeState(StateTypes.ChooseAction);
            }
        }, this);

        this.gs.events.on(SceneEvents.HoverOver, (u:BoardLocation) => {
            if(u.UnitSprite != null) {
                this.gs.PrimaryUnitSatus.LoadUnit(u.UnitSprite.u);
                this.gs.PrimaryUnitSatus.setVisible(true);
            }
        }, this);
        this.gs.events.on(SceneEvents.HoverLeave, () => {
                this.gs.PrimaryUnitSatus.setVisible(false);
        }, this);

    }

    LeaveState() {
        this.gs.events.removeListener(SceneEvents.Clicked);
        this.gs.PrimaryUnitSatus.removeAllListeners();
        this.gs.events.removeListener(SceneEvents.HoverOver);
        this.gs.events.removeListener(SceneEvents.HoverLeave);
    }
}