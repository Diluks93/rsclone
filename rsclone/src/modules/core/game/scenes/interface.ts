import Phaser from 'phaser';
import GameScore from '../helpers/gameScore';
import GameScene from './levels/gameScene';

import { SceneDataType } from '../../types/types';
import { ScoreOperations, Event, GameStatus, SceneKey, EventName } from '../../enums/enums';

export default class InterfaceScene extends Phaser.Scene {
  public score!: GameScore;

  inventoryItems: Phaser.GameObjects.Image[] = [];

  inventoryCells: Phaser.GameObjects.Rectangle[] = [];

  cellSize = 64;

  offset = 10;

  inventoryY = window.innerHeight - this.cellSize / 1.5;

  inventoryX = this.cellSize / 2 + this.offset;

  timer = 0;

  currentScene: Phaser.Scene | undefined;

  currentLevel: number | undefined;

  constructor() {
    super({ key: SceneKey.Interface });
  }

  init(data: SceneDataType) {
    this.currentLevel = data.currentLevel;
    this.currentScene = data.currentScene;
  }

  create(): void {
    this.score = new GameScore(this, 20, 20, 0);
    this.initListeners();
    this.scene.get(this.currentScene!).events.on(Event.AddItem, (item: string) => {
      const i = this.inventoryItems.length;
      const inventoryItem = this.add.image(
        this.inventoryX + this.cellSize * i + this.offset * i,
        this.inventoryY,
        item
      );
      this.inventoryItems.push(inventoryItem);
    });

    this.scene.get(this.currentScene!).events.on(Event.RemoveItem, (itemKey: string) => {
      this.inventoryItems.forEach((inventoryItem) => {
        if (inventoryItem.texture.key === itemKey) {
          inventoryItem.destroy();
        }
      });
      this.inventoryItems = this.inventoryItems.filter((item) => item.texture.key !== itemKey);
    });
  }

  update(delta: number): void {
    this.timer += delta;

    if (this.timer > 300 && this.currentLevel) {
      this.updateInventoryCells();
      this.updateInventoryItems();
      this.timer = 0;
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

  updateInventoryCells(): void {
    this.inventoryY = window.innerHeight - this.cellSize / 1.5;
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

  doorHandler(): void {
    this.score.changeValue(ScoreOperations.Increase, 25);
    const { winScore } = this.scene.get(this.currentScene!) as GameScene;
    if (this.score.getValue() >= winScore) {
      this.game.events.emit(Event.Endgame, GameStatus.Win);
    }
  }

  endGameHandler(gameStatus: GameStatus): void {
    this.scene.pause(this.currentScene);
    this.scene.launch(SceneKey.Endgame, {
      currentLevel: this.currentLevel,
      currentScene: this.currentScene,
      gameStatus,
      currentScore: this.score.scoreValue,
    });
    this.game.events.off(EventName.IncreaseScore, this.doorHandler);
    this.game.events.off(Event.Endgame, this.endGameHandler);
  }

  private initListeners(): void {
    this.game.events.on(EventName.IncreaseScore, this.doorHandler, this);
    this.game.events.once(Event.Endgame, this.endGameHandler, this);
  }
}
