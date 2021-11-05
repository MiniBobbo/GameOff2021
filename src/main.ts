import * as Phaser from "phaser";
import { GameScene } from "./scene/GameScene";
import { PreloadScene } from "./scene/Preload";


class Main extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      parent:"root",
      width: 600,
      height: 600,
      zoom:1,
      dom: {createContainer:true},
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            // debug: true
        }
      },
      // scene:{
      //   // preload:preload,
      //   // game:Game
      // },
      render: {
        pixelArt:true,
        roundPixels:true
      },
      // pixelArt:true
      
    };
    super(config);

    this.scene.add("preload", PreloadScene, true);
    this.scene.add("game", GameScene, false);
    this.scene.start("preload");
    }

}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};