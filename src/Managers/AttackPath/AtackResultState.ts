import { Unit, UnitStatus } from "../../Entity/Unit";
import { SceneEvents } from "../../scene/GameScene";
import { State } from "../State";
import { StateTypes } from "../StateManager";

export class AttackResulsState extends State {
    EnterState(result:{attacker:Unit, defender:Unit}) {
        this.gs.events.emit(SceneEvents.FreezeCamera);
        console.log('Entering AttackResultState');
        if(result.attacker.Status == UnitStatus.Dead) {
            let u = this.gs.b.KillUnitSprite(result.attacker.ID);
        } if(result.defender.Status == UnitStatus.Dead) {
            let u = this.gs.b.KillUnitSprite(result.defender.ID);
        }

        this.m.ChangeState(StateTypes.Selection);
    }

    LeaveState() {
        this.gs.events.emit(SceneEvents.MoveCamera);
        
    }

}