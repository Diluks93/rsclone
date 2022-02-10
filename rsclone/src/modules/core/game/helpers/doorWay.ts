import { DoorWayInterface } from './../../types/types';
import Phaser from 'phaser';

export default class DoorWay extends Phaser.GameObjects.Image implements DoorWayInterface {
  id: number;

  nextDoorWayId: number;

  isScored: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, nextDoorWayId: number, id: number) {
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    this.setOrigin(0);
    this.setVisible(false);
    this.id = id;
    this.isScored = false;
    this.nextDoorWayId = nextDoorWayId;
  }
}
