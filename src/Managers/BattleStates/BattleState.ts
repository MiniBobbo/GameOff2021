import { getJSDocAugmentsTag } from "typescript";
import { BattleScene } from "../../scene/BattleScene";
import { BattleStateManager } from "./BattleStateManager";

export class BattleState {
    bs:BattleScene;
    m:BattleStateManager;
    constructor(bs:BattleScene, manager:BattleStateManager) {
        this.bs = bs;
        this.m = manager;
    }

    EnterState(param?:unknown) {

    }

    LeaveState() {
        
    }
}