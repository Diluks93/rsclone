import { settingsStore } from './../../stores/settingsStore';
import { endgameFontConfig } from './../../constants/gameTextConfig';
import { GameText } from './../helpers/gameText';
import { SceneDataType } from './../../types/types';
import { GameStatus, PageId, SceneKey } from '../../enums/enums';
import gameTranslation from '../../data/gameTranslation.json';

export default class EndgameScene extends Phaser.Scene {
  gameStatus: number | undefined;

  currentScene: Phaser.Scene | undefined;

  currentLevel: number | undefined;

  currentScore: number | undefined;

  clickableArea: Phaser.GameObjects.Rectangle | undefined;

  private endgameText!: GameText;

  constructor() {
    super({ key: SceneKey.Endgame });
  }

  init(data: SceneDataType) {
    this.gameStatus = data.gameStatus;
    this.currentLevel = data.currentLevel;
    this.currentScene = data.currentScene;
    this.currentScore = data.currentScore;
    console.log(this.currentScore);
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
    const { loseText, winText, continueText } = gameTranslation[settingsStore.languageValue];
    const gameStatusText = this.gameStatus === GameStatus.Lose ? loseText : winText;
    this.endgameText = new GameText(
      this,
      this.game.scale.width / 2,
      this.game.scale.height * 0.4,
      `${gameStatusText}!\n${continueText}`.toUpperCase(),
      endgameFontConfig
    )
      .setAlign('center')
      .setColor(this.gameStatus === GameStatus.Lose ? '#ff0000' : '#ffffff');
    this.endgameText.setPosition(this.game.scale.width / 2 - this.endgameText.width / 2, this.game.scale.height * 0.4);

    this.clickableArea = this.add
      .rectangle(0, 0, settingsStore.windowWidth, settingsStore.windowHeight)
      .setInteractive()
      .setScale(5);

    this.clickableArea.on(
      'pointerdown',
      () => {
        console.log(this.currentLevel, this.currentScore);
        if (this.currentLevel !== undefined && this.currentScore !== undefined) {
          settingsStore.savePlayerScore(this.currentLevel, this.currentScore);
        }
        this.game.destroy(true);
        window.location.hash = PageId.LevelSelectPage;
      },
      this
    );
  }
}
