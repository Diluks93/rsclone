import { actionLabelFontConfig } from './../../constants/gameTextConfig';
import { DoorWayInterface } from './../../types/types';
import Actor from './actor';

import { GameKey, GameStatus, Event } from '../../enums/enums';
import { GameText } from '../helpers/text';

export default class Player extends Actor {
  private keyA: Phaser.Input.Keyboard.Key;

  private keyD: Phaser.Input.Keyboard.Key;

  private keySpace: Phaser.Input.Keyboard.Key;

  private SPEED = 500;

  public actionLabel: GameText;

  playerSounds;

  inventory: string[] = [];

  isPerformTrick = false;

  isWalkThroughDoor = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    playerSounds: {
      [index: string]: Phaser.Sound.BaseSound;
    }
  ) {
    super(scene, x, y, GameKey.Player, 7);
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keySpace = this.scene.input.keyboard.addKey(32);
    this.keySpace.on('down', (event: KeyboardEvent) => {
      this.anims.play('up', true);
    });
    this.getBody().setSize(190, 250);
    this.getBody().setOffset(0, 0);
    this.setDepth(1);
    this.playerSounds = playerSounds;
    this.actionLabel = new GameText(this.scene, this.x, this.y - this.height, 'E', actionLabelFontConfig)
      .setDepth(1)
      .setVisible(false);
  }

  update(): void {
    this.actionLabel.setPosition(this.x, this.y - this.height / 2);
    this.actionLabel.setOrigin(0.5);
    if (this.isPerformTrick) {
      this.getBody().setVelocityX(0);
      this.anims.play('up', true);
      return;
    }
    if (this.isWalkThroughDoor) {
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
  }

  public getDamage(value: number): void {
    super.getDamage(value);
    if (this.hp <= 0) {
      this.scene.game.events.emit(Event.GameEnd, GameStatus.Lose);
    }
  }

  public addItem(itemKey: string): void {
    this.inventory.push(itemKey);
    this.scene!.events.emit(Event.AddItem, itemKey);
    this.actionLabel.setVisible(false);
  }

  public removeItem(itemKey: string): void {
    this.inventory = this.inventory.filter((item) => item !== itemKey);
    this.scene!.events.emit(Event.RemoveItem, itemKey);
    this.isPerformTrick = false;
  }

  public startTrick(): void {
    this.isPerformTrick = true;
    this.playerSounds.trick.play();
  }

  public moveToDoor(doorWay: DoorWayInterface, isWalk: boolean): void {
    const oldPlayerPositionX = doorWay.x + this.width / 2;
    const oldPlayerPositionY = doorWay.y + this.height / 2;
    this.setPosition(oldPlayerPositionX, oldPlayerPositionY);
    this.isWalkThroughDoor = isWalk;
  }
}
