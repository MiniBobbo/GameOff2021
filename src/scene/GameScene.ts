import Phaser from 'phaser'
import { ActionControl } from '../Controls/ActionControl';
import { UnitStatus } from '../Controls/UnitStatus';
import { Player } from '../Entity/Player';
import { EndTurnButton } from '../Controls/EndTurnButton';
import { StateManager } from '../Managers/StateManager';
import { Board } from '../StrategyScene/Board';
import { UnitSpriteEvents } from '../StrategyScene/UnitSprite';

export class GameScene extends Phaser.Scene {
    Players:Array<Player>;
    CurrentPlayer:Player;
    p:{x:number, y:number};
    LocationLayer:Phaser.GameObjects.Layer;
    UnitLayer:Phaser.GameObjects.Layer;
    HudLayer:Phaser.GameObjects.Layer;
    SM:StateManager;
    PrimaryUnitSatus:UnitStatus;
    SecondaryUnitSatus:UnitStatus;
    Actions:ActionControl;
    b:Board;

    preload() {
        
    }

    create() {
        this.Players = [];
        this.LocationLayer = this.add.layer().setDepth(1);
        this.UnitLayer = this.add.layer().setDepth(2);
        this.HudLayer = this.add.layer().setDepth(3);
        this.SM = new StateManager(this);

        this.PrimaryUnitSatus = new UnitStatus(this, 2, 298).setVisible(false).setScrollFactor(0);
        this.SecondaryUnitSatus = new UnitStatus(this, 298, 298).setVisible(false).setScrollFactor(0);
        this.HudLayer.add(this.PrimaryUnitSatus);
        this.HudLayer.add(this.SecondaryUnitSatus);
        this.Actions = new ActionControl(this);
        this.HudLayer.add(this.Actions);
        this.HudLayer.add(new EndTurnButton(this).t);

        this.events.on(SceneEvents.EndTurn, this.EndTurn, this);
        this.events.on('destroy', this.destroy, this);
        this.events.on(SceneEvents.ChooseMeleeAttack, this.MeleeAttack, this);

    }

    MeleeAttack() {
        
    }

    destroy() {
        this.events.removeListener(SceneEvents.EndTurn);
    }

    update(time:number, dt:number) {

    }

    EndTurn() {
        this.b.AllUnitSprites.forEach(e=> {
            if(e.u.ControllingPlayer == this.CurrentPlayer) {
                e.emit(UnitSpriteEvents.Reset);
            }
        });  

    }

    CreatePlayers() {
        
    }

    AddPlayer(TeamName:string, TeamColor:number) {
        let p = new Player();
        p.ID = this.Players.length;
        p.TeamName = TeamName;
        p.TeamColor = TeamColor;
        this.Players.push(p);
    }
}

export enum SceneEvents {
    Debug = 'debug',
    Clicked = 'clicked',
    ClickedAction = 'clickedaction',
    HoverOver = 'hoverover',
    HoverLeave = 'hoverleave',
    ChangeState = 'changestate',
    Finished = 'finished',
    ClearHighlights = 'clearhighlights',
    EnableEndTurn = 'enableendturn',
    DisableEndTurn = 'disableendturn',
    EndTurn = 'endturn',
    ChooseMeleeAttack = 'choosemelee',
    ChooseRangedAttack = 'chooseranged'
    
}