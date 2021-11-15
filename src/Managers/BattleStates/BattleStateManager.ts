import { BattleScene } from "../../scene/BattleScene";
import { SceneEvents } from "../../scene/GameScene";
import { State } from "../State";
import { BattleState } from "./BattleState";
import { BattleWaitState } from "./BattleWaitState";

export class BattleStateManager {
    bs:BattleScene;
    States:Map<BattleStateTypes, BattleState>;
    CurrentState:BattleState;


    constructor(bs:BattleScene) {
        this.bs = bs;
        this.States = new Map<BattleStateTypes, BattleState>();
        this.States.set(BattleStateTypes.Wait, new BattleWaitState(bs, this));
        this.ChangeState(BattleStateTypes.Wait);
    }

    ChangeState(newState:BattleStateTypes, param?:unknown) {
        if(this.CurrentState != null)
            this.CurrentState.LeaveState();
        this.CurrentState = this.States.get(newState);
        this.CurrentState.EnterState(param);
        console.log(`Change State: ${BattleStateTypes[newState]}`);
        this.bs.events.emit(SceneEvents.ChangeState, newState);
    }


}

export enum BattleStateTypes {
    Wait,
    AttackerAttack,
    DefenderAttack,
    Next,
    End

    
}