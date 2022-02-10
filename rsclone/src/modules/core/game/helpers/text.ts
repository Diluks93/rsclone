import Phaser from 'phaser';
import { GameFont } from '../../enums/enums';

export class GameText extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    fontConfig: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, text, fontConfig);
    this.setOrigin(0, 0);
    scene.add.existing(this);
    this.setStroke(GameFont.TransparentBlackColor, 8);
  }
}
