import Phaser from 'phaser';
import GameScene from './game-scene';

export const config = {
  type: Phaser.AUTO,
  parent: 'first-step',
  width: Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  ),
  height: Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  ),
  zoom: 1,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [GameScene],
};
