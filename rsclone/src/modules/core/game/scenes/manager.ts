import Phaser from 'phaser';

import { LevelName, SceneKey } from '../../enums/enums';
import { settingsStore } from '../../stores/settingsStore';

export default class ManagerScene extends Phaser.Scene {
  tutorialLevelsAmount = 3;

  constructor() {
    super({ key: SceneKey.Manager });
  }

  create(): void {
    let currentScene;
    switch (settingsStore.currentLevel) {
      case LevelName.FirstSteps: {
        currentScene = this.createSceneAndGetKey(SceneKey.FirstSteps);
        break;
      }
      case LevelName.Onwards: {
        currentScene = this.createSceneAndGetKey(SceneKey.Onwards);
        break;
      }
      case LevelName.HereWeGo: {
        // todo: add third level scene and so on
        break;
      }
    }
    if (settingsStore.currentLevel < this.tutorialLevelsAmount) {
      this.scene.start(SceneKey.Tutorial, { currentLevel: settingsStore.currentLevel, currentScene });
    }
  }

  createSceneAndGetKey(key: SceneKey): SceneKey {
    this.scene.start(key);
    this.scene.pause(key);
    return key;
  }
}
