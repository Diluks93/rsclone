import { settingsStore } from './../../stores/settingsStore';
import { scoreFontConfig } from '../../constants/gameTextConfig';
import { ScoreOperations } from '../../enums/enums';
import { GameText } from './gameText';
import gameTranslation from '../../data/gameTranslation.json';

export default class GameScore extends GameText {
  public scoreValue: number;

  private scoreText: string;

  constructor(scene: Phaser.Scene, x: number, y: number, initScore = 0) {
    super(scene, x, y, '', scoreFontConfig);
    this.scoreText = gameTranslation[settingsStore.languageValue].scoreText;
    scene.add.existing(this);
    this.setStyle(scoreFontConfig);
    this.scoreValue = initScore;
    this.setText(this.scoreText + this.scoreValue);
  }

  public changeValue(operation: ScoreOperations, value: number): void {
    switch (operation) {
      case ScoreOperations.Increase:
        this.scoreValue += value;
        break;
      case ScoreOperations.Decrease:
        this.scoreValue -= value;
        break;
      case ScoreOperations.SetValue:
        this.scoreValue = value;
        break;
      default:
        break;
    }
    this.setText(this.scoreText + this.scoreValue);
  }

  public getValue(): number {
    return this.scoreValue;
  }
}
