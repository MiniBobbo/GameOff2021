import Phaser from 'phaser'
import { ActionControl } from '../Controls/ActionControl';
import { UnitStatus } from '../Controls/UnitStatus';
import { Player } from '../Entity/Player';
import { EndTurnButton } from '../Controls/EndTurnButton';
import { StateManager, StateTypes } from '../Managers/StateManager';
import { Board } from '../StrategyScene/Board';
import { UnitSpriteEvents } from '../StrategyScene/UnitSprite';
import { Unit } from '../Entity/Unit';
import { BattleScene, BattleSceneEvents, BattleType } from './BattleScene';
import { C } from '../C';

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
    bs:BattleScene;

    kUP:Phaser.Input.Keyboard.Key;
    kDOWN:Phaser.Input.Keyboard.Key;
    kLEFT:Phaser.Input.Keyboard.Key;
    kRIGHT:Phaser.Input.Keyboard.Key;

    


    private _moveCamera:boolean = true;

    preload() {
        
    }

    create() {
        //@ts-ignore
        // const grayscalePipeline = this.renderer.pipelines.get('gray');
        this.Players = [];
        this.LocationLayer = this.add.layer().setDepth(1);
        this.UnitLayer = this.add.layer().setDepth(2);
        this.HudLayer = this.add.layer().setDepth(3);
        this.SM = new StateManager(this);

        this.PrimaryUnitSatus = new UnitStatus(this, 2, 0).setVisible(false).setScrollFactor(0);
        this.SecondaryUnitSatus = new UnitStatus(this, 200, 0).setVisible(false).setScrollFactor(0);
        this.HudLayer.add(this.PrimaryUnitSatus);
        this.HudLayer.add(this.SecondaryUnitSatus);
        this.Actions = new ActionControl(this);
        this.HudLayer.add(this.Actions);
        this.HudLayer.add(new EndTurnButton(this).t);

        this.bs = new BattleScene(this);

        this.events.on(SceneEvents.EndTurn, this.EndTurn, this);
        this.events.on('destroy', this.destroy, this);
        this.events.on(SceneEvents.ChooseMeleeAttack, this.MeleeAttack, this);
        this.events.on(SceneEvents.ChooseRangedAttack, this.RangedAttack, this);
        this.events.on(SceneEvents.MoveCamera, () =>{this._moveCamera = true;}, this);
        this.events.on(SceneEvents.FreezeCamera, () =>{this._moveCamera = false;}, this);

        this.kUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.kDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.kLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.kRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    }

    update(time:number, dt:number) {
        var bs = this.bs;
        if(this._moveCamera) {
            if(this.kDOWN.isDown)
                this.cameras.main.scrollY += C.CAM_SCROLL_SPEED * (dt/1000);
            if(this.kUP.isDown)
                this.cameras.main.scrollY -= C.CAM_SCROLL_SPEED * (dt/1000);
            if(this.kLEFT.isDown)
                this.cameras.main.scrollX -= C.CAM_SCROLL_SPEED * (dt/1000);
            if(this.kRIGHT.isDown)
                this.cameras.main.scrollX += C.CAM_SCROLL_SPEED * (dt/1000);
        }
    }

    RangedAttack() {
        
    }


    MeleeAttack() {
        // create(units?:{attacker?:Unit, defender?:Unit, type?:BattleType}) {
        // this.scene.launch('battle', {attacker: this.PrimaryUnitSatus.Unit, defender:this.SecondaryUnitSatus.Unit, type:BattleType.Melee});
        this.bs.Start(this.PrimaryUnitSatus.Unit, this.SecondaryUnitSatus.Unit, BattleType.Melee);
    }

    /**
     * Resolves the 
     * @param a Attacking unit
     * @param d Defending unit
     */
    ResolveBattle(a:Unit, d:Unit) {
        console.log(`BattleScene resolved.  Returning to main scene`);
        this.bs.setVisible(false);
        // this.time.addEvent({
        //     delay:100,
        //     callback: () => {
        //         this.SM.ChangeState(StateTypes.Selection);
        //     },
        //     callbackScope:this
        // });
        this.events.once('test', () => {
        this.SM.ChangeState(StateTypes.Selection);
    }, this);
        this.events.emit('test');
    }   

    destroy() {
        this.events.removeListener(SceneEvents.EndTurn);
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
    ChooseRangedAttack = 'chooseranged',
    MoveCamera = 'movecamera',
    FreezeCamera = 'freezecamera',
    
}