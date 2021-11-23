import { Unit, UnitTypes } from "../Entity/Unit";

export class UnitStatus extends Phaser.GameObjects.Container {
    Team:Phaser.GameObjects.BitmapText;
    Name:Phaser.GameObjects.BitmapText;
    HP:Phaser.GameObjects.BitmapText;
    MaxHP:Phaser.GameObjects.BitmapText;
    Armor:Phaser.GameObjects.BitmapText;
    MagicResist:Phaser.GameObjects.BitmapText;
    Movement:Phaser.GameObjects.BitmapText;
    MovementType:Phaser.GameObjects.BitmapText;
    Unit:Unit;

    private g:Phaser.GameObjects.Image;


    private LabelX:number = 2;
    private LabelY:number = 2;
    private ValueX:number = 30;
    private SpacingY:number = 7;

    private font:string = '8px';
    
    constructor(scene:Phaser.Scene, x?:number, y?:number, children?:Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);
        scene.add.existing(this);
        this.g = scene.add.image(0,0, 'atlas', 'borders_0').setOrigin(0,0)
        this.add(this.g);

        let bfloader = {
            font:scene.cache.bitmapFont.get(this.font)
        }

        let row = 0;

        this.Team = scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), this.font, '');
        this.add(this.Team);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), this.font, 'Name'));
        this.Name = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), this.font, '');
        this.add(this.Name);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), this.font, 'HP'));
        this.HP = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), this.font, '');
        this.add(this.HP);
        row++;
        // this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), this.font, 'MaxHP'));
        // this.MaxHP = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), this.font, '');
        // this.add(this.MaxHP);
        // row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), this.font, 'Armor'));
        this.Armor = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), this.font, '');
        this.add(this.Armor);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), this.font, 'Resist'));
        this.MagicResist = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), this.font, '');
        this.add(this.MagicResist);
        row++;
        this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), this.font, 'Move'));
        this.Movement = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), this.font, '');
        this.add(this.Movement);
        row++;
        // this.add(scene.add.bitmapText(this.LabelX, this.LabelY + (this.SpacingY*row), this.font, 'M Type'));
        // this.MovementType = scene.add.bitmapText(this.ValueX, this.LabelY + (this.SpacingY*row), this.font, '');
        // this.add(this.MovementType);
        // row++;



    }

    LoadUnit(u:Unit) {
        this.Unit = u;
        this.Team.setText(u.ControllingPlayer.TeamName).setTint(u.ControllingPlayer.TeamColor);
        this.Name.setText(UnitTypes[u.Type]);
        // this.g.fillStyle(u.ControllingPlayer.TeamColor);
        // this.g.fillRect(0,0,60,60);
        this.HP.setText(`${u.CurrentHP.toString()}/${u.MaxHP.toString()}`);
        // this.MaxHP.setText(u.MaxHP.toString());
        this.Armor.setText(u.Armor.toString());
        this.MagicResist.setText(u.MagicResist.toString());
        this.Movement.setText(`${u.Movement.toString()} ${u.MovementType}`);
        // this.MovementType.setText(u.MovementType.toString());
    }

}