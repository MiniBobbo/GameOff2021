import { BattleSprite } from "../BattleScene/BattleSprite";
import { Unit } from "../Entity/Unit";

export class BattleScene extends Phaser.Scene {
    init:boolean = false;
    AttackerSprite:BattleSprite;
    DefenderSprite:BattleSprite;
    Attacker:Unit;
    Defender:Unit;


    create(attacker?:Unit, defender?:Unit) {
        console.log('BattleScene started.');
        if(!this.init)
            this.initFunction();

        
    }

    private initFunction() {
        this.init = true;
        this.AttackerSprite = new BattleSprite(this); 
        this.DefenderSprite = new BattleSprite(this);
        this.DefenderSprite.s.flipX = true; 
    }
}