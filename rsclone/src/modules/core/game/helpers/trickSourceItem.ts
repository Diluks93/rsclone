export default class TrickSourceItem extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, itemId: string) {
    super(scene, x, y, itemId);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    return this;
  }
};
