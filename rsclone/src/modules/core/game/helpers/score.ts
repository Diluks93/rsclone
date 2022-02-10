import { scoreFontConfig } from './../../constants/gameTextConfig';
import { ScoreOperations } from '../../enums/enums';
import { GameText } from './text';

export default class Score extends GameText {
  private scoreValue: number;

  constructor(scene: Phaser.Scene, x: number, y: number, initScore = 0) {
    super(scene, x, y, `Score: ${initScore}`, scoreFontConfig);
    scene.add.existing(this);
    this.setStyle(scoreFontConfig);
    this.scoreValue = initScore;
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
    this.setText(`Score: ${this.scoreValue}`);
  }

  public getValue(): number {
    return this.scoreValue;
  }
}
