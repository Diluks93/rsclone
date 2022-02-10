import Phaser from 'phaser';
import { Frame, GameKey } from '../../enums/enums';

export default class Actor extends Phaser.Physics.Arcade.Sprite {
  protected hp = 1;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
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
        }
      },
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }

  public getHPValue(): number {
    return this.hp;
  }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers(GameKey.Player, {
        start: Frame.LeftViewEnd,
        end: Frame.LeftViewStart,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'turn',
      frames: [
        {
          key: GameKey.Player,
          frame: Frame.FrontView,
        },
      ],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers(GameKey.Player, {
        start: Frame.RightViewStart,
        end: Frame.RightViewEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'up',
      frames: this.scene.anims.generateFrameNumbers(GameKey.Player, {
        start: Frame.RearViewStart,
        end: Frame.RearViewEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'down',
      frames: this.scene.anims.generateFrameNumbers(GameKey.Player, {
        start: Frame.FrontViewStart,
        end: Frame.FrontViewEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
