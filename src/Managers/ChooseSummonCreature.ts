import { UnitTypes } from "../Entity/Unit";
import { SceneEvents } from "../scene/GameScene";
import { BoardLocation } from "../StrategyScene/BoardLocation";
import { State } from "./State";
import { StateTypes } from "./StateManager";

export class ChooseSummonCreature extends State {
    EnterState(bl:BoardLocation) {
        this.gs.Summons.Activate(bl, this.gs.Actions.x, this.gs.Actions.y);
        this.gs.events.on(SceneEvents.SummonCreature, (e:UnitTypes) => {
            this.m.ChangeState(StateTypes.ChooseSummonLocation, e);
        });
        this.gs.input.on('pointerdown', () => {
            this.m.ChangeState(StateTypes.Selection);
        });
    
        this.gs.events.on(SceneEvents.Clicked, () => {
            this.m.ChangeState(StateTypes.Selection);
        });
    
    }

    LeaveState() {
        this.gs.Summons.Deactivate();
    }
}