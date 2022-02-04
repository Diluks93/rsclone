import Phaser from 'phaser';
import PreloadScene from './preload-scene';
import GameScene from './game-scene';
import InterfaceScene from './interface-scene';
import TutorialScene from './tutorial-scene';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'first-step',
    width: '100%',
    height: '100%',
  },
  transparent: true,
  zoom: 1,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 3000 },
      debug: true,
    },
  },
  scene: [PreloadScene,  GameScene, /* TutorialScene, InterfaceScene */],
};
