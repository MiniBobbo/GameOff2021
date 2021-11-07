import Phaser from 'phaser'
import { ActionControl } from '../Controls/ActionControl';
import { UnitStatus } from '../Controls/UnitStatus';
import { StateManager } from '../Managers/StateManager';

export class GameScene extends Phaser.Scene {
    p:{x:number, y:number};
    LocationLayer:Phaser.GameObjects.Layer;
    UnitLayer:Phaser.GameObjects.Layer;
    HudLayer:Phaser.GameObjects.Layer;
    SM:StateManager;
    PrimaryUnitSatus:UnitStatus;
    SecondaryUnitSatus:UnitStatus;
    Actions:ActionControl;

    preload() {
        
    }

    create() {
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
    }

    update(time:number, dt:number) {

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
    ClearHighlights = 'clearhighlights'
    
}