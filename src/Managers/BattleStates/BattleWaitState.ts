import { SceneEvents } from "../../scene/GameScene";
import { State } from "../State";
import { BattleState } from "./BattleState";
import { BattleStateTypes } from "./BattleStateManager";

export class BattleWaitState extends BattleState {
    private nextState:BattleStateTypes = BattleStateTypes.Wait;
    EnterState(param?:unknown) {
        if(param != null)
            this.nextState = param as BattleStateTypes;
            else
            this.nextState = BattleStateTypes.Wait;
        this.bs.on(SceneEvents.Finished, () => { this.m.ChangeState(this.nextState);});
    }

    LeaveState( ) {
        this.bs.removeListener(SceneEvents.Finished);
    }


}