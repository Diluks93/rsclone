import Actor from './actor';

import { actionLabelFontConfig } from './../../constants/gameTextConfig';
import { GameKey, GameStatus, Event, FrameKey, AnimationKey } from '../../enums/enums';
import { GameText } from '../helpers/gameText';
import TrickTargetItem from '../helpers/trickTargetItem';

export class Player extends Actor {
  private keyA: Phaser.Input.Keyboard.Key;

  private keyD: Phaser.Input.Keyboard.Key;

  private keyE: Phaser.Input.Keyboard.Key;

  private keySpace: Phaser.Input.Keyboard.Key;

  private speed = 400;

  public actionLabel: GameText;

  inventory: string[] = [];

  isPerformTrick = false;

  isAware = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,

    frame?: number
  ) {
    super(scene, x, y, texture, frame);
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyE = this.scene.input.keyboard.addKey('E');
    this.keySpace = this.scene.input.keyboard.addKey('SPACE');
    this.actionLabel = new GameText(this.scene, this.x, this.y - this.height, '', actionLabelFontConfig)
      .setVisible(false)
      .setDepth(1);
  }

  update(): void {
    this.actionLabel.setPosition(this.x, this.y - (this.height * this.scale) / 2);
    this.actionLabel.setOrigin(0.5);
    if (this.isPerformTrick) {
      this.getBody().setVelocityX(0);
      this.anims.play(AnimationKey.WoodyAction, true);
      return;
    }
    if (this.isWalkThroughDoor) {
      this.getBody().setVelocityX(0);
      this.anims.play(AnimationKey.WoodyUp, true);
      return;
    }
    this.playerSounds?.footsteps.on('keyup', () => {
      this.playerSounds?.footsteps.play();
    });
    this.getBody().setVelocity(0);
    if (this.keyE.isDown) {
      this.anims.play(AnimationKey.WoodyPick);
    } else if (this.keyA.isDown) {
      this.body.velocity.x = -this.speed;
      this.flipX = true;
      this.anims.play(AnimationKey.WoodySide, true);
    } else if (this.keyD.isDown) {
      this.flipX = false;
      this.body.velocity.x = this.speed;
      this.anims.play(AnimationKey.WoodySide, true);
    } else if (this.isAware) {
      this.anims.play(AnimationKey.WoodyAware);
    } else {
      this.anims.play(AnimationKey.WoodyIdle, true);
    }

    if (this.keyA.isUp && this.keyD.isUp) {
      this.playSounds(this.playerSounds?.footsteps);
    }
  }

  protected initAnimations(): void {
    this.scene.anims.create({
      key: AnimationKey.WoodyIdle,
      frames: [
        {
          key: GameKey.Player,
          frame: FrameKey.WoodyFrontMiddle,
        },
      ],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: AnimationKey.WoodyUp,
      frames: this.scene.anims.generateFrameNumbers(GameKey.Player, {
        start: FrameKey.WoodyBackStart,
        end: FrameKey.WoodyBackEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: AnimationKey.WoodySide,
      frames: this.scene.anims.generateFrameNumbers(GameKey.Player, {
        start: FrameKey.WoodySideStart,
        end: FrameKey.WoodySideEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: AnimationKey.WoodyDown,
      frames: this.scene.anims.generateFrameNumbers(GameKey.Player, {
        start: FrameKey.WoodyFrontStart,
        end: FrameKey.WoodyFrontEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: AnimationKey.WoodyAction,
      frames: this.scene.anims.generateFrameNumbers(GameKey.Player, {
        start: FrameKey.WoodyActionStart,
        end: FrameKey.WoodyActionEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: AnimationKey.WoodyPick,
      frames: [
        {
          key: GameKey.Player,
          frame: FrameKey.WoodyPick,
        },
      ],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: AnimationKey.WoodyAware,
      frames: [
        {
          key: GameKey.Player,
          frame: FrameKey.WoodyAware,
        },
      ],
      frameRate: 20,
    });
  }

  public getDamage(value: number): void {
    super.getDamage(value);
    if (this.maxHealth <= 0) {
      this.scene.game.events.emit(Event.Endgame, GameStatus.Lose);
    }
    this.playSounds(this.playerSounds?.fright);
  }

  public addItem(itemKey: string): void {
    this.inventory.push(itemKey);
    this.scene!.events.emit(Event.AddItem, itemKey);
    this.actionLabel.setVisible(false);
    this.playSounds(this.playerSounds?.delight);
  }

  public removeItem(itemKey: string): void {
    this.inventory = this.inventory.filter((item) => item !== itemKey);
    this.scene!.events.emit(Event.RemoveItem, itemKey);
    this.isPerformTrick = false;
  }

  public startTrick(): void {
    this.isPerformTrick = true;
    this.playSounds(this.playerSounds?.trick);
  }

  public finishTrick(targetItem: TrickTargetItem): void {
    this.removeItem(targetItem.keyItemId);
    targetItem.trickedItem.setVisible(true);
    targetItem.isTricked = true;
  }
}
