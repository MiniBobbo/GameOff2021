import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene {
    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                stroke:'#FFFFFF'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                stroke:'#FFFFFF'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                stroke:'#FFFFFF'
            }
        });

        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value:any) {
            //@ts-ignore
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file:any) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            //@ts-ignore
            this.scene.start('test');
        }, this);
    
        this.load.setBaseURL('./assets/')
        this.load.bitmapFont('6px', 'munro_0.png', 'munro.fnt');
        this.load.bitmapFont('6px2', '6px2_0.png', '6px2.fnt');
        this.load.bitmapFont('8px', '8px_0.png', '8px.fnt');
        // this.load.bitmapFont('outline', 'outline_0.png', 'outline.fnt');
        this.load.image('tiletemp', 'tiletemp.png');
        this.load.image('unittemp', 'UnitTemp.png');
        this.load.image('buttonback', 'buttonback.png');
        this.load.image('endturn', 'EndTurnButton.png');
        this.load.multiatlas('atlas', 'atlas.json');

    }

    create() {
        // this.anims.create({ key: 'ant_idle', frameRate: 60, frames: this.anims.generateFrameNames('atlas', { prefix: 'ant_stand_', end: 0}), repeat: 0 });

    }
}