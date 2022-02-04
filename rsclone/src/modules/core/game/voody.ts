import { GameKey } from '../enums/enums';
import { Actor } from './actor';

export class Player extends Actor {
  private keyA: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyE: Phaser.Input.Keyboard.Key;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, GameKey.Player, 7);
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyE = this.scene.input.keyboard.addKey('E');
    this.getBody().setSize(190, 250);
    this.getBody().setOffset(0, 0);
  }

  update(): void {
    this.getBody().setVelocity(0);
    if (this.keyA.isDown) {
      this.body.velocity.x = -190;
      this.anims.play('left', true);
    } else if (this.keyD.isDown) {
      this.body.velocity.x = 190;
      this.anims.play('right', true);     
    } else if (this.getBody().setVelocity(0)) {
      this.anims.play('turn', true);
    }

  }
}