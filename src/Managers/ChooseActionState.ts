import { ActionTypes } from "../Controls/ActionControl";
import { SceneEvents } from "../scene/GameScene";
import { BoardLocation } from "../StrategyScene/BoardLocation";
import { State } from "./State";
import { StateTypes } from "./StateManager";

export class ChooseActionState extends State {
EnterState(bl:BoardLocation) {
    this.gs.Actions.Activate(bl);

    this.gs.events.on(SceneEvents.ClickedAction, (e:ActionTypes) => {
        switch (e) {
            case ActionTypes.Move:
                this.m.ChangeState(StateTypes.ChooseMoveLocation);
                break;
            case ActionTypes.Attack:
                this.m.ChangeState(StateTypes.ChooseAttackTarget);
            break;
            case ActionTypes.Summon:
                this.m.ChangeState(StateTypes.Summon, bl);
            break;
            default:
                break;
        }

    });
    this.gs.input.on('pointerdown', () => {
        this.m.ChangeState(StateTypes.Selection);
    });

    this.gs.events.on(SceneEvents.Clicked, () => {
        this.m.ChangeState(StateTypes.Selection);
    });

}

LeaveState() {
    this.gs.events.removeListener(SceneEvents.ClickedAction);
    this.gs.input.removeListener('pointerdown');
    this.gs.Actions.Deactivate();
    this.gs.events.removeListener(SceneEvents.Clicked);
}

}
