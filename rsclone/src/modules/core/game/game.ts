import Phaser from 'phaser';
import { GameKey } from '../enums/enums';
import GameScene from './game-scene';
import InterfaceScene from './interface-scene';
import ManagerScene from './manager-scene';
import PreloadScene from './preload-scene';
import TutorialScene from './tutorial-scene';

export const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: GameKey.CanvasParent,
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
  scene: [PreloadScene, ManagerScene, GameScene, TutorialScene, InterfaceScene],
};
