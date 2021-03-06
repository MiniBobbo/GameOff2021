import { SceneEvents } from "../scene/GameScene";
import { State } from "./State";
import { StateTypes } from "./StateManager";

export class WaitState extends State {
    private nextState:StateTypes = StateTypes.Selection;
    EnterState(param?:unknown) {
        this.gs.events.emit(SceneEvents.FreezeCamera);

        if(param != null)
            this.nextState = param as StateTypes;
            else
            this.nextState = StateTypes.Selection;
        this.gs.events.on(SceneEvents.Finished, () => { this.m.ChangeState(this.nextState);});
    }

    LeaveState( ) {
        this.gs.events.emit(SceneEvents.MoveCamera);
        this.gs.events.removeListener(SceneEvents.Finished);
    }


}