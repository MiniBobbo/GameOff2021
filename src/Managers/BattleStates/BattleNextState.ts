import { SceneEvents } from "../../scene/GameScene";
import { BattleState } from "./BattleState";

export class BattleNextState extends BattleState {
    EnterState() {
        this.bs.events.emit(SceneEvents.Finished);
    }
}