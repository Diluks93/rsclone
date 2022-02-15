import Actor from './actor';
import { actionLabelFontConfig } from './../../constants/gameTextConfig';
import { DoorWayInterface } from './../../types/types';
import { GameKey, GameStatus, Event, FrameKey, AnimationKey, StorageKey } from '../../enums/enums';
import { GameText } from '../helpers/gameText';

export default class Player extends Actor {
  private keyA: Phaser.Input.Keyboard.Key;

  private keyD: Phaser.Input.Keyboard.Key;

  private keyE: Phaser.Input.Keyboard.Key;

  private keySpace: Phaser.Input.Keyboard.Key;

  private SPEED = 500;

  public actionLabel: GameText;

  playerSounds;

  inventory: string[] = [];

  isPerformTrick = false;

  isWalkThroughDoor = false;

  isAware = false;

  hasSoundResolution: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    playerSounds: {
      [index: string]: Phaser.Sound.BaseSound;
    },
    frame?: number
  ) {
    super(scene, x, y, texture, frame);
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyE = this.scene.input.keyboard.addKey('E');
    this.keySpace = this.scene.input.keyboard.addKey('SPACE');
    this.playerSounds = playerSounds;
    this.actionLabel = new GameText(this.scene, this.x, this.y - this.height, '', actionLabelFontConfig)
      .setDepth(1)
      .setVisible(false);
    this.setDepth(1);
    this.hasSoundResolution = JSON.parse(localStorage.getItem(StorageKey.SoundCheckbox) as string);
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
    if (this.keyA.isDown) {
      this.body.velocity.x = -this.SPEED;
      this.flipX = true;
      this.anims.play(AnimationKey.WoodySide, true);
    } else if (this.keyD.isDown) {
      this.flipX = false;
      this.body.velocity.x = this.SPEED;
      this.anims.play(AnimationKey.WoodySide, true);
    } else if (this.isAware) {
      this.anims.play(AnimationKey.WoodyAware);
    } else {
      this.anims.play(AnimationKey.WoodyIdle, true);
    }

    if (this.keyA.isUp && this.keyD.isUp) {
      if (this.hasSoundResolution || this.hasSoundResolution === null) this.playerSounds.footsteps.play();
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
    // todo: without locationOffset prop hero slightly jumps on Y axis
    const locationOffset = 30;
    const oldPlayerPositionX = doorWay.x + (this.width * this.scale) / 2 + locationOffset;
    const oldPlayerPositionY = doorWay.y + (this.height * this.scale) / 2 + locationOffset;
    this.setPosition(oldPlayerPositionX, oldPlayerPositionY);
    this.isWalkThroughDoor = isWalk;
  }
}
