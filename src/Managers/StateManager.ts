import { Unit } from "../Entity/Unit";
import { GameScene, SceneEvents } from "../scene/GameScene";
import { UnitSprite } from "../StrategyScene/UnitSprite";
import { AttackResulsState } from "./AttackPath/AtackResultState";
import { ChooseMeleeRangedState } from "./AttackPath/ChooseMeleeRangedState";
import { ChooseTargetState } from "./AttackPath/ChooseTargetState";
import { ChooseActionState } from "./ChooseActionState";
import { ChooseMoveLocation } from "./ChooseMoveLocation";
import { ChooseSummonCreature } from "./ChooseSummonCreature";
import { ChooseSummonLocation } from "./ChooseSummonLocation";
import { SelectionState } from "./SelectionState";
import { State } from "./State";
import { WaitState } from "./WaitState";

export class StateManager {
    gs:GameScene;
    States:Map<StateTypes, State>;
    PrimaryUnit:UnitSprite;
    SecondaryUnit:UnitSprite;
    CurrentState:State;


    constructor(gs:GameScene) {
        this.gs = gs;
        this.States = new Map<StateTypes, State>();
        this.States.set(StateTypes.Selection, new SelectionState(gs, this));
        this.States.set(StateTypes.Wait, new WaitState(gs, this));
        this.States.set(StateTypes.ChooseAction, new ChooseActionState(gs, this));
        this.States.set(StateTypes.ChooseMoveLocation, new ChooseMoveLocation(gs, this));
        this.States.set(StateTypes.ChooseAttackTarget, new ChooseTargetState(gs, this));
        this.States.set(StateTypes.ChooseMeleeOrRanged, new ChooseMeleeRangedState(gs, this));
        this.States.set(StateTypes.AttackResult, new AttackResulsState(gs, this));
        this.States.set(StateTypes.Summon, new ChooseSummonCreature(gs, this));
        this.States.set(StateTypes.ChooseSummonLocation, new ChooseSummonLocation(gs, this));
        this.ChangeState(StateTypes.Wait);
    }

    ChangeState(newState:StateTypes, param?:unknown) {
        if(this.CurrentState != null)
            this.CurrentState.LeaveState();
        this.CurrentState = this.States.get(newState);
        this.CurrentState.EnterState(param);
        console.log(`Change State: ${StateTypes[newState]}`);
        this.gs.events.emit(SceneEvents.ChangeState, newState);
    }


}

export enum StateTypes {
    Selection,
    UnitSelected,
    EndTurn,
    Summon,
    ChooseSummonLocation,
    ChooseAction,
    ChooseMoveLocation,
    ChooseAttackTarget,
    ChooseMeleeOrRanged,
    Wait,
    AttackResult,
    
}