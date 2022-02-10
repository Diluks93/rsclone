import Phaser from 'phaser';
import { LevelName, SceneKey } from '../../enums/enums';
import { settingsStore } from '../../stores/settingsStore';

const TUTORIAL_LEVELS_AMOUNT = 3;

export default class ManagerScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKey.ManagerScene });
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
    if (settingsStore.currentLevel < TUTORIAL_LEVELS_AMOUNT) {
      this.scene.start(SceneKey.TutorialScene, { currentLevel: settingsStore.currentLevel, currentScene });
    }
  }

  createSceneAndGetKey(key: SceneKey): SceneKey {
    this.scene.start(key);
    this.scene.pause(key);
    return key;
  }
}
