import Phaser from 'phaser';
import { AnimationKey, FrameKey, GameKey } from '../../enums/enums';
import Actor from './actor';
import Player from './player';

export default class Neighbor extends Actor {
  private target: Player;

  private agressionRange = 500;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target: Player, frame?: number) {
    super(scene, x, y, texture, frame);
    this.target = target;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
  }

  update(): void {
    if (this.getDistanceFromTarget() > this.agressionRange) {
      this.stopMove();
    } else if (this.getDistanceFromTarget() < this.target.width * this.scale) {
      this.attackTarget();
    } else {
      this.moveToTarget();
    }
  }

  protected initAnimations(): void {
    this.scene.anims.create({
      key: AnimationKey.NeighborIdle,
      frames: [
        {
          key: GameKey.Neighbor,
          frame: FrameKey.NeighborFrontMiddle,
        },
      ],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: AnimationKey.NeighborUp,
      frames: this.scene.anims.generateFrameNumbers(GameKey.Neighbor, {
        start: FrameKey.NeighborBackStart,
        end: FrameKey.NeighborBackEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: AnimationKey.NeighborDown,
      frames: this.scene.anims.generateFrameNumbers(GameKey.Neighbor, {
        start: FrameKey.NeighborFrontStart,
        end: FrameKey.NeighborFrontEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: AnimationKey.NeighborSide,
      frames: this.scene.anims.generateFrameNumbers(GameKey.Neighbor, {
        start: FrameKey.NeighborSideStart,
        end: FrameKey.NeighborSideEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: AnimationKey.NeighborAnger,
      frames: this.scene.anims.generateFrameNumbers(GameKey.Neighbor, {
        start: FrameKey.NeighborAngerStart,
        end: FrameKey.NeighborAngerEnd,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  private getDistanceFromTarget(): number {
    return Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y });
  }

  private moveToTarget() {
    const targetX = this.target.x;
    const neighborX = this.x;

    if (targetX > neighborX) {
      this.x += 1;
      this.flipX = false;
    } else {
      this.x -= 1;
      this.flipX = true;
    }
    this.anims.play(AnimationKey.NeighborSide, true);
    this.target.isAware = true;
  }

  private stopMove() {
    this.anims.play(AnimationKey.NeighborIdle);
    this.target.isAware = false;
  }

  private attackTarget() {
    this.anims.play(AnimationKey.NeighborAnger, true);
    this.disableBody(true, false);
  }

  public setTarget(target: Player): void {
    this.target = target;
  }
}
