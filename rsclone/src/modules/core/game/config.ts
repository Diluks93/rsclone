import Phaser from 'phaser';
import PreloadScene from './scenes/preload';
import GameScene from './scenes/levels/firstStep';
import TutorialScene from './scenes/tutorial';
import UIScene from './scenes/ui';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'game',
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
  scene: [PreloadScene, GameScene, UIScene, TutorialScene,],
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);

      window.game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
      );
    }, 100);
  }
};

window.onresize = () => window.sizeChanged();
