import { MeleeRangedControl } from "../../Controls/MeleeRangedControl";
import { SceneEvents } from "../../scene/GameScene";
import { UnitSpriteEvents } from "../../StrategyScene/UnitSprite";
import { State } from "../State";
import { StateTypes } from "../StateManager";

export class ChooseMeleeRangedState extends State {
    control:MeleeRangedControl;
    EnterState() {
        this.control = new MeleeRangedControl(this.gs, this.gs.PrimaryUnitSatus.Unit, this.gs.SecondaryUnitSatus.Unit);
        this.gs.events.on(SceneEvents.Clicked, ()=> {this.m.ChangeState(StateTypes.Selection);});
        this.gs.events.on(SceneEvents.ChooseMeleeAttack, () =>{
            console.log('Selected Melee');
            this.m.ChangeState(StateTypes.Wait);
            this.m.PrimaryUnit.emit(UnitSpriteEvents.InteractComplete);
        });
        this.gs.events.on(SceneEvents.ChooseRangedAttack, () =>{
            console.log('Selected Ranged');
            this.m.ChangeState(StateTypes.Wait);
            this.m.PrimaryUnit.emit(UnitSpriteEvents.InteractComplete);
        });
    }

    LeaveState() {
        this.control.destroy();
        this.gs.events.removeListener(SceneEvents.Clicked);
        this.gs.SecondaryUnitSatus.setVisible(false);
        this.gs.PrimaryUnitSatus.setVisible(false);
        // this.gs.events.removeListener(SceneEvents.ChooseMeleeAttack);
        // this.gs.events.removeListener(SceneEvents.ChooseRangedAttack);
    }
}