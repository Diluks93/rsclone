import Actor from './actor';
import { GameKey, GameStatus, Event } from '../../enums/enums';

export default class Player extends Actor {
  private keyA: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyE: Phaser.Input.Keyboard.Key;
  private keySpace: Phaser.Input.Keyboard.Key;
  private SPEED: number = 500;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, GameKey.Player, 7);
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyE = this.scene.input.keyboard.addKey('E');
    this.keySpace = this.scene.input.keyboard.addKey(32);
    this.keySpace.on('down', (event: KeyboardEvent) => {
      this.anims.play('up', true);
    });
    this.getBody().setSize(190, 250);
    this.getBody().setOffset(0, 0);
  }

  update(): void {
    this.getBody().setVelocity(0);
    if (this.keyA.isDown) {
      this.body.velocity.x = -this.SPEED;
      this.anims.play('left', true);
    } else if (this.keyD.isDown) {
      this.body.velocity.x = this.SPEED;
      this.anims.play('right', true);     
    } else {
      this.anims.play('turn', true);
    }
  }

  public getDamage(value: number): void {
    super.getDamage(value);
    if (this.hp <= 0) {
      this.scene.game.events.emit(Event.GameEnd, GameStatus.Lose)
    }
  }
}