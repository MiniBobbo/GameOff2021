import { getJSDocAugmentsTag } from "typescript";
import { GameScene } from "../scene/GameScene";
import { StateManager } from "./StateManager";

export class State {
    gs:GameScene;
    m:StateManager;
    constructor(gs:GameScene, manager:StateManager) {
        this.gs = gs;
        this.m = manager;
    }

    EnterState(param?:unknown) {

    }

    LeaveState() {
        
    }
}