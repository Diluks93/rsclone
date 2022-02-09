import Phaser from 'phaser';
import { LevelNameEnum, SceneKey } from '../enums/enums';
import { settingsStore } from '../stores/settingsStore';

export default class ManagerScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKey.ManagerScene });
  }

  create(): void {
    switch (settingsStore.currentLevel) {
      case LevelNameEnum.FirstSteps: {
        this.scene.start(SceneKey.FirstSteps);
        this.scene.start(SceneKey.TutorialScene);
      }
      case LevelNameEnum.Onwards: {
        // todo: add second level scene
      }
      case LevelNameEnum.HereWeGo: {
        // todo: add third level scene and so on
      }
    }
  }
}
