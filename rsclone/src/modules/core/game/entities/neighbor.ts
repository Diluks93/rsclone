import Phaser from 'phaser';
import Actor from './actor';
import Player from './player';

export default class Neighbor extends Actor {
  private target: Player;
  private AGGRESSOR_RADIUS = 200;

  constructor(
    scene: Phaser.Scene,
    x: number, 
    y: number,
    texture: string,
    target: Player,
    frame: number
  ) {
    super(scene, x, y, texture, frame);
    this.target = target;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.getBody().setSize(190, 250);
    this.getBody().setOffset(0, 0);
  }

  preUpdate(): void {
    if ( 
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y } 
        ) < this.AGGRESSOR_RADIUS) {
          this.getBody().setVelocityX(this.target.x - this.x)
      } else {
        this.getBody().setVelocity(0);
      }
  }

  public setTarget(target: Player): void {
    this.target = target;
  }
};
