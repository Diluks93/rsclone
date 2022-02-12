import Phaser from 'phaser';

const SCALE = 8;
const HEALTH = 1;

export default class Actor extends Phaser.Physics.Arcade.Sprite {
  protected hp = HEALTH;

  protected initAnimations(): void {}

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.setScale(SCALE);
    this.initAnimations();
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
          this.hp = this.hp - value;
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
    return this.hp;
  }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}
