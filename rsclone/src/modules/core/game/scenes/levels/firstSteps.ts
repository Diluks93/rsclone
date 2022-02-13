import GameScene from './gameScene';
import { MaxScore, SceneKey } from '../../../enums/enums';

export default class FirstSteps extends GameScene {
  constructor() {
    super({ key: SceneKey.FirstSteps });
    this.winScore = MaxScore.FirstSteps;
  }
}
