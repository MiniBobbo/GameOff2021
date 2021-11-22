import { SceneEvents } from "../../scene/GameScene";
import { State } from "../State"

export class ResolveAttackState extends State {
    EnterState() {
        this.gs.events.emit(SceneEvents.FreezeCamera);
    }

    LeaveState() {
        this.gs.events.emit(SceneEvents.MoveCamera);
    }
}