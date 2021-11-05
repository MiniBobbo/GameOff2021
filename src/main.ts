import * as Phaser from "phaser";
import { GameScene } from "./scene/GameScene";
import { PreloadScene } from "./scene/Preload";
import { TestScene } from "./scene/TestScene";


class Main extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      parent:"root",
      width: 400,
      height: 400,
      zoom:2,
      dom: {createContainer:true},
      render: {
        pixelArt:true,
        roundPixels:true
      },
      // pixelArt:true
      
    };
    super(config);

    this.scene.add("preload", PreloadScene, true);
    this.scene.add("game", GameScene, false);
    this.scene.add("test", TestScene, false);
    this.scene.start("preload");
    }

}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};