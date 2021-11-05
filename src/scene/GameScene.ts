import Phaser from 'phaser'


//@ts-ignore
import { MergedInput } from '../../assets/plugin/main'

export class GameScene extends Phaser.Scene {
    g:Phaser.GameObjects.Image;
    p:{x:number, y:number};
    preload() {
        this.load.scenePlugin('mergedInput', MergedInput);
    }
    create() {
        this.add.text(100,100, 'Test');
        this.p = {x:0, y:0};
        // this.scene.run('render');
        //@ts-ignore
        // let player1 = this.mergedInput.addPlayer(0);
        this.PointerLock();

    }

    update() {
        this.g.setPosition(this.p.x,this.p.y );
    }

    PointerLock() {
        this.input.on('pointerdown', function () {
            //@ts-ignore
            this.input.mouse.requestPointerLock();
    
        }, this);

        this.g = this.add.image(240, 135, 'ball')
        .setDepth(21);
    
        // When locked, you will have to use the movementX and movementY properties of the pointer
        // (since a locked cursor's xy position does not update)
            //@ts-ignore
            this.input.on('pointermove', function (pointer) {
            //@ts-ignore
            if (this.input.mouse.locked)
            {
                //@ts-ignore
                this.p.x += pointer.movementX;
                //@ts-ignore
                this.p.y += pointer.movementY;
                //@ts-ignore
                this.p.x = Phaser.Math.Clamp(this.p.x, 0, 480);
                //@ts-ignore
                this.p.y = Phaser.Math.Clamp(this.p.y, 0, 270);
                
            }
        }, this);
    }

}