import * as Phaser from "phaser";
import GrayScalePipeline from "../assets/pipelines/grayscale";
import { BattleScene } from "./scene/BattleScene";
import { GameScene } from "./scene/GameScene";
import { PreloadScene } from "./scene/Preload";
import { TestScene } from "./scene/TestScene";




class Main extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      parent:"root",
      width: 256,
      height: 224,
      zoom:3,
      dom: {createContainer:true},
      render: {
        pixelArt:true,
        roundPixels:true,
        // pipeline: {
        //   name:'gray',
        //   //@ts-ignore
        //   pipeline:GrayScalePipeline
  
        // }
        },
      // pixelArt:true
      
    };
    super(config);

    // let r = this.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
    // r.pipelines.add('gray', new GrayScalePipeline(this));
    
    this.scene.add("preload", PreloadScene, true);
    this.scene.add("game", GameScene, false);
    this.scene.add("test", TestScene, false);
    this.scene.start("preload");
    }

}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};