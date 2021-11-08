import { Unit, UnitTypes } from "../Entity/Unit";

export class UnitStatus extends Phaser.GameObjects.Container {
    Name:Phaser.GameObjects.BitmapText;
    HP:Phaser.GameObjects.BitmapText;
    MaxHP:Phaser.GameObjects.BitmapText;
    Armor:Phaser.GameObjects.BitmapText;
    MagicResist:Phaser.GameObjects.BitmapText;
    Movement:Phaser.GameObjects.BitmapText;
    MovementType:Phaser.GameObjects.BitmapText;
    Unit:Unit;

    private g:Phaser.GameObjects.Graphics;


    private LabelX:number = 3;
    private LabelY:number = 10;
    private ValueX:number = 50;
    private SpacingY:number = 10;
    
    constructor(scene:Phaser.Scene, x?:number, y?:number, children?:Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);
        scene.add.existing(this);
        this.g = scene.add.graphics({
            x:0,
            y:0
        })
        .fillStyle(0xFFFFFF, .8);
        this.g.fillRect(0,0,100,100);
        this.add(this.g);

        let bfloader = {
            font:scene.cache.bitmapFont.get('6px')
        }

        let row = 0;

        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), '6px', 'Name'));
        this.Name = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), '6px', '');
        this.add(this.Name);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), '6px', 'HP'));
        this.HP = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), '6px', '');
        this.add(this.HP);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), '6px', 'MaxHP'));
        this.MaxHP = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), '6px', '');
        this.add(this.MaxHP);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), '6px', 'Armor'));
        this.Armor = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), '6px', '');
        this.add(this.Armor);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), '6px', 'Resist'));
        this.MagicResist = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), '6px', '');
        this.add(this.MagicResist);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), '6px', 'Move'));
        this.Movement = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), '6px', '');
        this.add(this.Movement);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), '6px', 'M Type'));
        this.MovementType = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), '6px', '');
        this.add(this.MovementType);
        row++;



    }

    LoadUnit(u:Unit) {
        this.Unit = u;
        this.Name.setText(UnitTypes[u.Type]);
        this.g.fillStyle(u.ControllingPlayer.TeamColor);
        this.g.fillRect(0,0,100,100);
        this.HP.setText(u.CurrentHP.toString());
        this.MaxHP.setText(u.MaxHP.toString());
        this.Armor.setText(u.Armor.toString());
        this.MagicResist.setText(u.MagicResist.toString());
        this.Movement.setText(u.Movement.toString());
        this.MovementType.setText(u.MovementType.toString());
    }

}