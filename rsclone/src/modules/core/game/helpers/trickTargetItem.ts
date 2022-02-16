export default class TrickTargetItem extends Phaser.GameObjects.Container {
  keyItemId: string;

  isTricked = false;

  originalItem: Phaser.GameObjects.Image;

  trickedItem: Phaser.GameObjects.Image;

  scale = 6;

  constructor(scene: Phaser.Scene, x: number, y: number, children: Phaser.GameObjects.Image[], keyItemId: string) {
    super(scene, x, y, children);
    this.originalItem = this.scene.physics.add.staticImage(x, y, children[0].texture.key).setScale(this.scale);
    this.trickedItem = this.scene.physics.add.staticImage(x, y, children[1].texture.key).setScale(this.scale);
    this.trickedItem.setVisible(false);
    this.keyItemId = keyItemId;
  }

  fixTrick() {
    this.trickedItem.setVisible(false);
  }
}
