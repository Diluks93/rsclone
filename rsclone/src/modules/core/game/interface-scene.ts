import { SceneKey } from '../enums/enums';

export default class InterfaceScene extends Phaser.Scene {
  inventoryItems: Phaser.GameObjects.Image[] = [];

  inventoryCells: Phaser.GameObjects.Rectangle[] = [];

  cellSize = 64;

  offset = 10;

  inventoryY = window.innerHeight - this.cellSize / 1.5;

  inventoryX = this.cellSize / 2 + this.offset;

  timer = 0;

  constructor() {
    super({ key: SceneKey.InterfaceScene });
  }

  create(): void {
    this.scene.get(SceneKey.FirstStep).events.on('additem', (item: string) => {
      const i = this.inventoryItems.length;
      const inventoryItem = this.add.image(
        this.inventoryX + this.cellSize * i + this.offset * i,
        this.inventoryY,
        item
      );
      this.inventoryItems.push(inventoryItem);
    });

    this.scene.get(SceneKey.FirstStep).events.on('removeitem', (itemKey: string) => {
      this.inventoryItems.forEach((inventoryItem) => {
        if (inventoryItem.texture.key === itemKey) {
          inventoryItem.destroy();
        }
      });
      this.inventoryItems = this.inventoryItems.filter((item) => item.texture.key !== itemKey);
    });
  }

  update(time: number, delta: number): void {
    this.timer += delta;

    if (this.timer > 300) {
      this.inventoryY = window.innerHeight - this.cellSize / 1.5;
      this.updateInventoryCells();
      this.updateInventoryItems();
      this.timer = 0;
    }
  }

  updateInventoryCells(): void {
    this.inventoryCells.forEach((cell) => {
      cell.destroy();
    });
    const cellsAmount = 10;
    for (let i = 0; i < cellsAmount; i++) {
      this.inventoryCells.push(
        this.add.rectangle(
          this.inventoryX + this.cellSize * i + this.offset * i,
          this.inventoryY,
          this.cellSize,
          this.cellSize,
          0x000000,
          0.5
        )
      );
    }
  }

  updateInventoryItems(): void {
    this.inventoryItems.forEach((item: Phaser.GameObjects.Image) => {
      item.destroy();
    });
    const inventoryCopy = [...this.inventoryItems];
    this.inventoryItems = [];
    inventoryCopy.forEach((item: Phaser.GameObjects.Image, i: number) => {
      this.inventoryItems.push(
        this.add.image(this.inventoryX + this.cellSize * i + this.offset * i, this.inventoryY, item.texture.key)
      );
    });
  }
}
