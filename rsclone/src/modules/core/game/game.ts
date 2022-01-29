import Phaser from 'phaser';
import GameScene from './game-scene';
import PreloadScene from './preload-scene';

export const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'first-step',
    width: '100%',
    height: '100%',
  },
  zoom: 1,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [PreloadScene, GameScene],
};
