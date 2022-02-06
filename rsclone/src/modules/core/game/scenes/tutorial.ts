import Phaser from 'phaser';
import gameTranslation from '../../data/gameTranslation.json';

import { speechConfig, speechFontConfig, hintFontConfig } from '../../constants/constInterfaceScene';
import { settingsStore } from '../../stores/settingsStore';
import { GameKey } from '../../enums/enums';

type PortraitType = {
  portraitBox: Phaser.GameObjects.Graphics;
  directorImage: Phaser.GameObjects.Image;
};

const speech = gameTranslation[settingsStore.languageValue].tutorialSpeech;
const hint = gameTranslation[settingsStore.languageValue].tutorialHint;

export default class TutorialScene extends Phaser.Scene {
  speechCount = 0;

  timer = 0;

  isSpeechVisible = true;

  speechContainer: Phaser.GameObjects.Container | undefined;

  portraitBox: Phaser.GameObjects.Graphics | undefined;

  directorImage: Phaser.GameObjects.Image | undefined;

  speechText: Phaser.GameObjects.Text | undefined;

  constructor() {
    super({ key: 'tutorial-scene' });
  }

  create(): void {
    const { screenWidth, screenHeight, portraitSize, offset } = speechConfig;
    const { windowHeight, windowWidth } = settingsStore;
    console.log(windowHeight, windowWidth);

    const { portraitBox, directorImage } = this.createPortrait(portraitSize);
    this.portraitBox = portraitBox;
    this.directorImage = directorImage;

    this.speechText = this.add.text(portraitSize, 0, speech[this.speechCount], speechFontConfig);
    this.speechText.setInteractive();

    const hintText = this.add.text(screenWidth / 2 - 100, portraitSize - offset, hint, hintFontConfig);
    this.tweens.add({
      targets: hintText,
      alpha: 0,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    if (this.portraitBox && this.directorImage) {
      this.speechContainer = this.add.container(0, screenHeight - portraitSize, [
        this.portraitBox,
        this.directorImage,
        this.speechText,
        hintText,
      ]);
      this.speechContainer.setInteractive();
      this.speechContainer.visible = true;
    }

    this.speechText.on('pointerdown', () => {
      if (!this.speechText) return;

      this.speechText.setText(speech[++this.speechCount]);

      if (this.speechCount >= speech.length && this.speechContainer) {
        // this.speechContainer.setVisible(false);
        this.scene.sleep('tutorial-scene');
        this.scene.launch('ui-scene');
        this.scene.resume('first-step');
      }
    });
  }

  update(delta: number): void {
    this.timer += delta;
    if (this.timer > 400) {
      console.log(settingsStore.windowWidth);
      this.speechContainer?.setPosition(0, settingsStore.windowHeight - 208);
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
