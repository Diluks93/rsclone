import Phaser from 'phaser';
import gameTranslation from '../../data/gameTranslation.json';

import { tutorialSpeechFontConfig, tutorialHintFontConfig } from '../../constants/gameTextConfig';
import { speechConfig } from '../../constants/constInterfaceScene';
import { settingsStore } from '../../stores/settingsStore';
import { GameKey, SceneKey } from '../../enums/enums';

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
  hintText: Phaser.GameObjects.Text | undefined;

  constructor() {
    super({ key: SceneKey.TutorialScene });
  }

  create(): void {
    const { portraitSize, offset, hintTextWidth } = speechConfig;

    const { portraitBox, directorImage } = this.createPortrait(portraitSize);
    this.portraitBox = portraitBox;
    this.directorImage = directorImage;

    this.speechText = this.add.text(portraitSize, 0, speech[this.speechCount], tutorialSpeechFontConfig);
    this.speechText.setInteractive();

    const { windowWidth, windowHeight } = settingsStore;
    this.hintText = this.add.text(windowWidth - hintTextWidth, portraitSize - offset, hint, tutorialHintFontConfig);
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

      this.speechText.setText(speech[++this.speechCount]);

      if (this.speechCount >= speech.length && this.speechContainer) {
        this.speechContainer.setVisible(false);
        this.scene.sleep(SceneKey.TutorialScene);
        this.scene.launch(SceneKey.InterfaceScene);
        this.scene.resume(SceneKey.FirstSteps);
      }
    });
  }

  update(time: number, delta: number): void {
    this.timer += delta;
    const { windowWidth, windowHeight } = settingsStore;
    const { portraitSize, offset, hintTextWidth } = speechConfig;
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
