import Phaser from 'phaser';
import PreloadScene from './scenes/preload';
import TutorialScene from './scenes/tutorial';
import ManagerScene from './scenes/managerScene';
import UIScene from './scenes/ui';
import FirstSteps from './scenes/levels/firstSteps';
import Onwards from './scenes/levels/onwards';

import { GameConfigExtended } from '../types/types';
import { GameKey } from '../enums/enums';

export const gameConfig: GameConfigExtended = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: GameKey.CanvasParent,
    width: window.innerWidth,
    height: window.innerHeight,
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
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  autoFocus: true,
  audio: {
    disableWebAudio: true,
  },
  scene: [PreloadScene, ManagerScene, FirstSteps, Onwards, UIScene, TutorialScene],
  winScore: 70,
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);

      window.game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
      );
    }, 100);
  }
};

window.onresize = () => window.sizeChanged();
