import { DoorWayInterface } from './../../types/types';
import Phaser from 'phaser';
import { StorageKey } from '../../enums/enums';

export default class Actor extends Phaser.Physics.Arcade.Sprite {
  protected maxHealth = 1;

  protected scaleValue = 8;

  protected initAnimations(): void {}

  protected isWalkThroughDoor = false;

  protected isAllowedToPlaySounds: boolean;

  public actorSounds: Record<string, Phaser.Sound.BaseSound> | undefined;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
    actorSounds?: Record<string, Phaser.Sound.BaseSound>
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.setScale(this.scaleValue);
    this.initAnimations();
    this.setDepth(1);
    this.actorSounds = actorSounds;
    this.isAllowedToPlaySounds = JSON.parse(localStorage.getItem(StorageKey.SoundCheckbox) as string);
  }

  public getDamage(value?: number): void {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this.maxHealth = this.maxHealth - value;
          this.setTint(0xff0000);
        }
      },
      onComplete: () => {
        this.setAlpha(1);
        this.clearTint();
      },
    });
  }

  public getHPValue(): number {
    return this.maxHealth;
  }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  public moveToDoor(doorWay: DoorWayInterface, isWalk: boolean): void {
    // todo: without locationOffset prop hero slightly jumps on Y axis
    const locationOffset = 20;
    const oldActorPositionX = doorWay.x + (this.width * this.scale) / 2 + locationOffset;
    const oldActorPositionY = doorWay.y + (this.height * this.scale) / 2 + locationOffset;
    this.setPosition(oldActorPositionX, oldActorPositionY);
    this.isWalkThroughDoor = isWalk;
    this.playSounds(this.actorSounds?.doorOpen);
  }

  public playSounds(soundKey: Phaser.Sound.BaseSound | undefined): void {
    if ((this.isAllowedToPlaySounds || this.isAllowedToPlaySounds === null) && soundKey) {
      soundKey.play();
    }
  }

  public pauseSounds(soundKey: Phaser.Sound.BaseSound | undefined): void {
    if (soundKey) {
      soundKey.pause();
    }
  }
}
