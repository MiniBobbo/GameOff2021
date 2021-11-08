export class BattleScene extends Phaser.Scene {
    init:boolean = false;

    create() {
        console.log('BattleScene started.');
        if(!this.init)
            this.initFunction();
    }

    private initFunction() {
        this.init = true;
    }
}