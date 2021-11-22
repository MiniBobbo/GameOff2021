import { Unit } from "../Entity/Unit";
import { GameScene, SceneEvents } from "../scene/GameScene";

export class MeleeRangedControl extends Phaser.GameObjects.Container {
    private color:number = 0x222222;
    private hovercolor:number = 0x777777;
    private invalidcolor:number = 0xff0000;


    melee:Phaser.GameObjects.Graphics;
    meleeButton:Phaser.GameObjects.Image;
    ranged:Phaser.GameObjects.Graphics;
    rangedButton:Phaser.GameObjects.Image;
    constructor(gs:GameScene, attacker:Unit, defender:Unit) {
        super(gs);

        let font = '8px';
        let attposx:number = 2;
        let defposx:number = 100;


        let boxwidth = 160;
        let boxwheight = 50;

        this.meleeButton = gs.add.image(0,20, 'buttonback').setOrigin(0);
        this.rangedButton = gs.add.image(0,80, 'buttonback').setOrigin(0);
        this.add(this.meleeButton);
        this.add(this.rangedButton);

        this.setPosition(20,100);
        gs.add.existing(this);
        gs.HudLayer.add(this);
        this.add(gs.add.bitmapText(0,0, '8px', 'Attacker' ));
        this.melee = gs.add.graphics({
            x:0,
            y:20
        });
        this.melee.fillStyle(this.color).fillRect(0,0,boxwidth,boxwheight);
        this.add(this.melee);
        if(attacker.MeleeAttack != null && attacker.MeleeAttack.Number > 0) {
            this.add(gs.add.bitmapText(attposx,20, font, `Attacker:\n${attacker.MeleeAttack.Name}\n${attacker.MeleeAttack.Number} at ${attacker.MeleeAttack.Damage} Damage\n${(attacker.MeleeAttack.BaseAccuracy*100).toFixed(0)}% hit chance`));
        }
        else {
            this.add(gs.add.bitmapText(attposx,20, font, `${attacker.Name} has no\nmelee attacks.`));
        }
        if(defender.MeleeAttack != null && defender.MeleeAttack.Number > 0)  {
            this.add(gs.add.bitmapText(defposx,20, font, `Defender:\n ${defender.MeleeAttack.Name}\n${defender.MeleeAttack.Number} at ${defender.MeleeAttack.Damage} Damage\n${(attacker.MeleeAttack.BaseAccuracy*100).toFixed(0)}% hit chance`));
        }
        else {
            this.add(gs.add.bitmapText(defposx,20, font, `Defender  : ${defender.Name} has no\nmelee attacks.`));
        }

        this.ranged = gs.add.graphics({
            x:0,
            y:80
        });
        this.ranged.fillStyle(this.color).fillRect(0,0,boxwidth,boxwheight).setInteractive();
        this.add(this.ranged);

        if(attacker.RangedAttack != null && attacker.RangedAttack.Number > 0) {
            this.add(gs.add.bitmapText(attposx,80, font, `Melee : ${attacker.RangedAttack.Name}\n${attacker.RangedAttack.Number} attacks at ${attacker.RangedAttack.Damage} Damage\n${(attacker.RangedAttack.BaseAccuracy*100).toFixed(0)}% hit chance`));
        }
        else {
            this.add(gs.add.bitmapText(attposx,80, font, `${attacker.Name} has no\nranged attacks.`));
        }
        if(defender.RangedAttack != null && defender.RangedAttack.Number > 0)  {
            this.add(gs.add.bitmapText(defposx,80, font, `Ranged : ${defender.RangedAttack.Name}\n${defender.RangedAttack.Number} attacks at ${defender.RangedAttack.Damage} Damage\n${(attacker.RangedAttack.BaseAccuracy*100).toFixed(0)}% hit chance`));
        }
        else {
            this.add(gs.add.bitmapText(defposx,80, font, `${defender.Name} has no\nranged attacks.`));
        }

        if(attacker.MeleeAttack != null && attacker.MeleeAttack.Number > 0) {
            this.meleeButton.on('pointerover', () => {this.melee.fillStyle(this.hovercolor).fillRect(0,0,boxwidth,boxwheight);});
            this.meleeButton.on('pointerout', () => {this.melee.fillStyle(this.color).fillRect(0,0,boxwidth,boxwheight);});
            this.meleeButton.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {gs.events.emit(SceneEvents.ChooseMeleeAttack); e.stopPropagation();});
        } else {
            this.melee.fillStyle(this.invalidcolor).fillRect(1,1,boxwidth-2,boxwheight-2);
        }

        if(attacker.RangedAttack != null  && attacker.RangedAttack.Number > 0) {
            this.rangedButton.on('pointerover', () => {this.melee.fillStyle(this.hovercolor).fillRect(0,0,boxwidth,boxwheight);});
            this.rangedButton.on('pointerout', () => {this.melee.fillStyle(this.color).fillRect(0,0,boxwidth,boxwheight);});
            this.rangedButton.on('pointerdown', (p:any, x:any, y:any, e:Phaser.Types.Input.EventData) => {gs.events.emit(SceneEvents.ChooseRangedAttack); e.stopPropagation();});

        } else {
            this.ranged.fillStyle(this.invalidcolor).fillRect(1,1,boxwidth-2,boxwheight-2);
        }
    }

}