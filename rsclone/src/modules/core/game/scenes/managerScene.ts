import Phaser from 'phaser';
import { LevelNameEnum, SceneKey } from '../../enums/enums';
import { settingsStore } from '../../stores/settingsStore';

export default class ManagerScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKey.ManagerScene });
  }

  create(): void {
    let currentScene;
    switch (settingsStore.currentLevel) {
      case LevelNameEnum.FirstSteps: {
        currentScene = this.createSceneAndGetKey(SceneKey.FirstSteps);
        break;
      }
      case LevelNameEnum.Onwards: {
        currentScene = this.createSceneAndGetKey(SceneKey.Onwards);
        break;
      }
      case LevelNameEnum.HereWeGo: {
        // todo: add third level scene and so on
        break;
      }
    }
    if (settingsStore.currentLevel < 3) {
      this.scene.start(SceneKey.TutorialScene, { currentLevel: settingsStore.currentLevel, currentScene });
    }
  }

  createSceneAndGetKey(key: SceneKey): SceneKey {
    this.scene.start(key);
    this.scene.pause(key);
    return key;
  }
}
