import Phaser from 'phaser';
import Score from '../score';
import { Text } from '../helpers/text';
import { GameKey, ScoreOperations, Event, GameStatus } from '../../enums/enums';

export default class UIScene extends Phaser.Scene {
  private score!: Score;
  private gameEndPhrase !: Text;
  private inventory: Phaser.GameObjects.Text | undefined;
  private doorHandler: () => void;
  private gameEndHandler: (status: GameStatus) => void;

  constructor() {
    super('ui-scene');
    this.doorHandler = () => {
      this.score.changeValue(ScoreOperations.Increase, 25)
    }
    this.gameEndHandler = (status) => {
      this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.6');
      this.game.scene.pause('first-step');

      this.gameEndPhrase  = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.Lose 
          ? `YOU DIED!\nCLICK TO RESTART`
          : `YOU WIN!\nCLICK TO RESTART`,
      ).setAlign('center')
      .setColor(status === GameStatus.Lose ? '#ff0000' : '#ffffff');
    this.gameEndPhrase.setPosition(
      this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
      this.game.scale.height * 0.4,
      )
    }
  }

  create(): void {
    this.score = new Score(this, 50, 100);
    this.initListeners();
    this.inventory = new Text(this, 50, 150, 'Nothing')
  }

  private initListeners(): void {
    this.game.events.on(GameKey.Fake, this.doorHandler, this);
    this.game.events.once(Event.GameEnd, this.gameEndHandler, this);
  }
}