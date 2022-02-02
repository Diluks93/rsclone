export default class InterfaceScene extends Phaser.Scene {
  inventory: Phaser.GameObjects.Text | undefined;

  constructor() {
    super({ key: 'ui-scene' });
  }

  create(): void {
    this.inventory = this.add.text(100, 100, 'Nothing', {
      fontSize: '32px',
    });
  }
}
