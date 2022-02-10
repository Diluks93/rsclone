import { GameText } from '../helpers/gameText';
import { PortraitType, SceneDataType } from './../../types/types';
import Phaser from 'phaser';
import gameTranslation from '../../data/gameTranslation.json';

import { tutorialSpeechFontConfig, continueTextFontConfig } from '../../constants/gameTextConfig';
import { tutorialSpeechConfig } from '../../constants/constInterfaceScene';
import { settingsStore } from '../../stores/settingsStore';
import { GameKey, SceneKey } from '../../enums/enums';

export default class TutorialScene extends Phaser.Scene {
  speechCount = 0;

  timer = 0;

  isSpeechVisible = true;

  speechContainer: Phaser.GameObjects.Container | undefined;

  portraitBox: Phaser.GameObjects.Graphics | undefined;

  directorImage: Phaser.GameObjects.Image | undefined;

  speechText: Phaser.GameObjects.Text | undefined;

  hintText: Phaser.GameObjects.Text | undefined;

  sceneData: SceneDataType | undefined;

  tutorialSpeech: string[] | undefined;

  continueText: string;

  currentLevel: number | undefined;

  currentScene: Phaser.Scene | undefined;

  constructor() {
    super({ key: SceneKey.TutorialScene });
    this.continueText = gameTranslation[settingsStore.languageValue].continueText;
  }

  init(data: SceneDataType) {
    this.sceneData = data;
    const { currentLevel, currentScene } = this.sceneData;
    this.currentLevel = currentLevel;
    this.currentScene = currentScene;
    this.tutorialSpeech = gameTranslation[settingsStore.languageValue].tutorialSpeech[currentLevel];
  }

  create(): void {
    const { portraitSize, offset, hintTextWidth } = tutorialSpeechConfig;

    const { portraitBox, directorImage } = this.createPortrait(portraitSize);
    this.portraitBox = portraitBox;
    this.directorImage = directorImage;

    this.speechText = new GameText(
      this,
      portraitSize,
      0,
      this.tutorialSpeech![this.speechCount],
      tutorialSpeechFontConfig
    );
    this.speechText.setInteractive();

    const { windowWidth, windowHeight } = settingsStore;
    this.hintText = new GameText(
      this,
      windowWidth - hintTextWidth,
      portraitSize - offset,
      this.continueText,
      continueTextFontConfig
    );
    this.tweens.add({
      targets: this.hintText,
      alpha: 0,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    if (this.portraitBox && this.directorImage) {
      this.speechContainer = this.add.container(0, windowHeight - portraitSize, [
        this.portraitBox,
        this.directorImage,
        this.speechText,
        this.hintText,
      ]);
      this.speechContainer.visible = true;
    }

    this.speechText.on('pointerdown', () => {
      if (!this.speechText) return;

      this.speechText.setText(this.tutorialSpeech![++this.speechCount]);

      if (this.speechCount >= this.tutorialSpeech!.length && this.speechContainer) {
        this.speechContainer.setVisible(false);
        this.scene.resume(this.currentScene);
        this.scene.sleep(SceneKey.TutorialScene);

        this.scene.launch(SceneKey.InterfaceScene, {
          currentLevel: this.currentLevel,
          currentScene: this.currentScene,
        });
      }
    });
  }

  update(time: number, delta: number): void {
    this.timer += delta;
    const { windowWidth, windowHeight } = settingsStore;
    const { portraitSize, offset, hintTextWidth } = tutorialSpeechConfig;
    if (this.timer > 400) {
      this.speechContainer?.setPosition(0, windowHeight - 208);
      this.speechText?.setStyle({
        fixedWidth: windowWidth - portraitSize,
        wordWrap: { width: windowWidth - portraitSize - offset },
      });
      this.hintText?.setPosition(windowWidth - hintTextWidth, portraitSize - offset);
      this.timer = 0;
    }
  }

  createPortrait(portraitSize: number): PortraitType {
    const portraitBox = this.add.graphics();
    portraitBox.setInteractive();
    portraitBox.fillStyle(0x000000, 1);
    portraitBox.fillRect(0, 0, portraitSize, portraitSize);
    const directorImage = this.add.image(0, 0, GameKey.Director).setOrigin(0, 0);

    return {
      portraitBox,
      directorImage,
    };
  }
}
