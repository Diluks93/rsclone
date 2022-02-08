import Actor from './actor';

import { GameKey, GameStatus, Event } from '../../enums/enums';
import { Text } from '../helpers/text'

export default class Player extends Actor {
  private keyA: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keySpace: Phaser.Input.Keyboard.Key;
  private SPEED: number = 500;
  public actionLabel: Text;
  playerSounds;
  inventory: string[] = [];
  isPerformTrick = false;

  constructor(scene: Phaser.Scene, x: number, y: number, playerSounds: {
      [index: string]: Phaser.Sound.BaseSound;
    }) {
    super(scene, x, y, GameKey.Player, 7);
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keySpace = this.scene.input.keyboard.addKey(32);
    this.keySpace.on('down', (event: KeyboardEvent) => {
      this.anims.play('up', true);
    });
    this.getBody().setSize(190, 250);
    this.getBody().setOffset(0, 0);
    this.playerSounds = playerSounds;
    this.actionLabel = new Text(this.scene, this.x, this.y - this.height, 'E')
      .setFontSize(20)
      .setOrigin(0.8,0.5)
  }

  update(): void {
    if (this.isPerformTrick) {
      this.getBody().setVelocityX(0);
      this.anims.play('up', true);

      return;
    }
    this.playerSounds?.footsteps.on('keyup', () => {
        this.playerSounds?.footsteps.play();
    });
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

    if (this.keyA.isUp && this.keyD.isUp) {
      this.playerSounds.footsteps.play();
    }

    this.actionLabel.setPosition(this.x + 10, this.y - this.height * 0.4);
    this.actionLabel.setOrigin(0.8, 0.5);
  }

  public getDamage(value: number): void {
    super.getDamage(value);
    if (this.hp <= 0) {
      this.scene.game.events.emit(Event.GameEnd, GameStatus.Lose)
    }
  }

  addItem(itemKey: string) {
    this.inventory.push(itemKey);
    this.scene!.events.emit('additem', itemKey);
  }

  removeItem(itemKey: string) {
    this.inventory = this.inventory.filter((item) => item !== itemKey);
    this.scene!.events.emit('removeitem', itemKey);
  }
};
