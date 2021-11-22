import { Unit, UnitStatus } from "../../Entity/Unit";
import { State } from "../State";
import { StateTypes } from "../StateManager";

export class AttackResulsState extends State {
    EnterState(result:{attacker:Unit, defender:Unit}) {
        console.log('Entering AttackResultState');
        if(result.attacker.Status == UnitStatus.Dead) {
            let u = this.gs.b.KillUnitSprite(result.attacker.ID);
        } if(result.defender.Status == UnitStatus.Dead) {
            let u = this.gs.b.KillUnitSprite(result.defender.ID);
        }

        this.m.ChangeState(StateTypes.Selection);
    }

    LeaveState() {
        
    }

}