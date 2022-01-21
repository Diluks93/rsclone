import Phaser from 'phaser';

import GameScene from './game-scene';

export const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: { 
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }
    }
  },
  scene: [GameScene],
};