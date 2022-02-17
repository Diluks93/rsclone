import Phaser from 'phaser';
import Actor from './actor';
import { AnimationKey, FrameKey, GameKey } from '../../enums/enums';
import { Player } from './player';

const FIRST_FLOOR_ROOM = {
  leftSide: 1000,
  rightSide: 2700,
  center: 1850,
  ceil: 1000,
};

export default class Neighbor extends Actor {
  private target: Player;

  private aggressionRange = 500;

  public isOverlapDoorway = false;

  public isAngry = false;

  public hasChangedRoom = false;

  public velocity = 200;

  private speedUp = 100;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target: Player, frame?: number) {
    super(scene, x, y, texture, frame);
    this.target = target;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
  }

  update(): void {
    // door interaction
    if (this.isWalkThroughDoor) {
      this.setVelocityX(0);
      this.anims.play(AnimationKey.NeighborUp, true);
      return;
    }

    // reaction to tricks
    if (this.isAngry) {
      this.setVelocityX(0);
      this.anims.play(AnimationKey.NeighborAnger, true);
      return;
    }

    // agression
    if (this.getDistanceFromTarget() < this.aggressionRange) {
      this.followTarget();
    } else {
      this.stopFollowTarget();
    }
    if (this.getDistanceFromTarget() < this.target.width * this.scale) {
      this.attackTarget();
    }

    // default movement
    if (this.x < FIRST_FLOOR_ROOM.leftSide) {
      this.turnToLeft(this.velocity);
      this.anims.play(AnimationKey.NeighborSide, true);
    }
    if (this.x > FIRST_FLOOR_ROOM.rightSide) {
      this.turnToRight(this.velocity);
      this.anims.play(AnimationKey.NeighborSide, true);
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

  turnToLeft(velocity: number) {
    this.flipX = false;
    this.setVelocityX(velocity);
  }

  turnToRight(velocity: number) {
    this.flipX = true;
    this.setVelocityX(-velocity);
  }

  private followTarget() {
    const targetX = this.target.x;
    const neighborX = this.x;
    const increasedSpeed = this.velocity + this.speedUp;
    if (targetX > neighborX) {
      this.turnToLeft(increasedSpeed);
    } else {
      this.turnToRight(increasedSpeed);
    }
    this.anims.play(AnimationKey.NeighborSide, true);
    this.target.isAware = true;
  }

  private stopFollowTarget() {
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
