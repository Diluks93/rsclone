import GameScene from './gameScene';
import { SceneKey } from '../../../enums/enums';

export default class FirstStep extends GameScene {
  constructor() {
    super({ key: SceneKey.FirstStep})
  }
}