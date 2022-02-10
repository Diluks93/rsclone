import { endGameFontConfig } from './../../constants/gameTextConfig';
import { SceneDataType } from './../../types/types';
import Phaser from 'phaser';
import Score from '../helpers/score';

import { GameText } from '../helpers/text';
import { ScoreOperations, Event, GameStatus, SceneKey, EventName } from '../../enums/enums';
import { gameConfig } from '../config';

export default class UIScene extends Phaser.Scene {
  private score!: Score;

  private gameEndPhrase!: GameText;

  private doorHandler: () => void;

  private gameEndHandler: (status: GameStatus) => void;

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
    super({ key: SceneKey.InterfaceScene });
    this.doorHandler = () => {
      this.score.changeValue(ScoreOperations.Increase, 25);
      if (this.score.getValue() === gameConfig.winScore) {
        this.game.events.emit(Event.GameEnd, GameStatus.Win);
      }
    };

    this.gameEndHandler = (status) => {
      this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
      this.scene.pause(this.currentScene!);

      this.gameEndPhrase = new GameText(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.Lose ? 'YOU DIED!\nCLICK TO RESTART' : 'YOU WIN!\nCLICK TO RESTART',
        endGameFontConfig
      )
        .setAlign('center')
        .setColor(status === GameStatus.Lose ? '#ff0000' : '#ffffff');
      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4
      );

      this.input.on('pointerdown', () => {
        this.game.events.off(EventName.IncreaseScore, this.doorHandler);
        this.game.events.off(Event.GameEnd, this.gameEndHandler);
        this.scene.restart(this.currentScene!);
      });
    };
  }

  init(data: SceneDataType) {
    this.currentLevel = data.currentLevel;
    this.currentScene = data.currentScene;
  }

  create(): void {
    this.score = new Score(this, 20, 20, 0);
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

  update(time: number, delta: number): void {
    this.timer += delta;

    if (this.timer > 300 && this.currentLevel) {
      this.updateInventoryCells();
      this.updateInventoryItems();
      this.timer = 0;
    }
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

  private initListeners(): void {
    this.game.events.on(EventName.IncreaseScore, this.doorHandler, this);
    this.game.events.once(Event.GameEnd, this.gameEndHandler, this);
  }
}
