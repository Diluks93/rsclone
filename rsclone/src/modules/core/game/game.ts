import Phaser from 'phaser';

import World from './world'

export const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: { 
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [World],
};