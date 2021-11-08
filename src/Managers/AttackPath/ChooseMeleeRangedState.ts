import { MeleeRangedControl } from "../../Controls/MeleeRangedControl";
import { SceneEvents } from "../../scene/GameScene";
import { State } from "../State";
import { StateTypes } from "../StateManager";

export class ChooseMeleeRangedState extends State {
    control:MeleeRangedControl;
    EnterState() {
        this.control = new MeleeRangedControl(this.gs, this.gs.PrimaryUnitSatus.Unit, this.gs.SecondaryUnitSatus.Unit);
        this.gs.events.on(SceneEvents.Clicked, ()=> {this.m.ChangeState(StateTypes.Selection);});
        this.gs.events.on(SceneEvents.ChooseMeleeAttack, () =>{
            this.m.ChangeState(StateTypes.Wait);
        });
        this.gs.events.on(SceneEvents.ChooseRangedAttack, () =>{
            this.m.ChangeState(StateTypes.Wait);
        });
        
    }

    LeaveState() {
        this.control.destroy();
        this.gs.events.removeListener(SceneEvents.Clicked);
        this.gs.events.removeListener(SceneEvents.ChooseMeleeAttack);
        this.gs.events.removeListener(SceneEvents.ChooseRangedAttack);
    }
}