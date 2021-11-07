import { ActionTypes } from "../Controls/ActionControl";
import { SceneEvents } from "../scene/GameScene";
import { State } from "./State";
import { StateTypes } from "./StateManager";

export class ChooseActionState extends State {
EnterState() {
    this.gs.events.on(SceneEvents.ClickedAction, (e:ActionTypes) => {
        switch (e) {
            case ActionTypes.Move:
                this.m.ChangeState(StateTypes.ChooseMoveLocation);
                break;
        
            default:
                break;
        }

    });
    this.gs.input.on('pointerdown', () => {
        this.m.ChangeState(StateTypes.Selection);
    })

}

LeaveState() {
    this.gs.events.removeListener(SceneEvents.ClickedAction);
    this.gs.input.removeListener('pointerdown');
    this.gs.Actions.Deactivate();
}

}
