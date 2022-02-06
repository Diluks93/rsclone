import Phaser from 'phaser';
import Player from './player';

import { config } from './game';
import { GameKey, SceneKey } from '../enums/enums';
import TrickSourceItem from './trick-source-item';
import TrickTargetItem from './trick-target-item';
import { TargetItemConfigType } from '../types/types';

export default class GameScene extends Phaser.Scene {
  cursor: ReturnType<<T>() => T>;

  actionKey: Phaser.Input.Keyboard.Key | undefined;

  player: Player;

  music: Phaser.Sound.BaseSound | undefined;

  platforms: Phaser.Tilemaps.TilemapLayer | undefined;

  width = config.scale.width;

  height = config.scale.height;

  trickSourceItems: TrickSourceItem[] = [];

  trickTargetItems: TrickTargetItem[] = [];

  isActionAvailable = false;

  sizeWorld = {
    width: 3840,
    height: 1536,
  };

  mapLayer = {
    platforms: 'platforms',
    object: {
      id: 'object',
      name: 'spawn-point',
    },
  };

  playerSounds: {
    [index: string]: Phaser.Sound.BaseSound;
  };

  constructor() {
    super({ key: SceneKey.FirstStep });
    this.playerSounds = {};
    this.player = new Player(this, 0, 0, this.playerSounds);
  }

  create(): void {
    this.actionKey = this.input.keyboard.addKey('E');

    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('assets', 'assets');
    this.playerSounds.footsteps = this.sound.add(GameKey.SoundFootsteps);
    this.playerSounds.prank = this.sound.add(GameKey.SoundPrank);

    this.music = this.sound.add(GameKey.MusicGame, { volume: 0.1 });
    this.music.play();

    this.platforms = map.createLayer(this.mapLayer.platforms, tileset, 0, 0);
    this.platforms.setCollisionByExclusion([-1], true);

    const picture = this.createTrickTargetItem({
      x: 3000,
      y: 1200,
      originalItemKey: GameKey.Picture,
      trickedItemKey: GameKey.TrickedPicture,
      actionItemKey: GameKey.Pen,
    });
    this.trickTargetItems.push(picture);
    console.log(picture.originalItem.getBounds());

    const pen = new TrickSourceItem(this, 3200, 1300, GameKey.Pen);
    const pen2 = new TrickSourceItem(this, 3300, 1300, GameKey.Pen);
    this.trickSourceItems.push(pen);
    this.trickSourceItems.push(pen2);

    const spawnPoint = map.findObject(this.mapLayer.object.id, (obj) => obj.name === this.mapLayer.object.name);

    this.player = new Player(this, spawnPoint.x, spawnPoint.y, this.playerSounds);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.world.bounds.width = this.sizeWorld.width;
    this.physics.world.bounds.height = this.sizeWorld.height;

    this.cameras.main.setBounds(0, 0, this.sizeWorld.width, this.sizeWorld.height);

    if (this.player.sprite) {
      this.cameras.main.startFollow(this.player.sprite);
    }
    this.cameras.main.roundPixels = true;

    if (this.player.sprite) {
      this.physics.add.collider(this.player.sprite, this.platforms);
    }

    this.addOverlapActionToItems();

    this.cursor = this.input.keyboard.createCursorKeys();
    this.scale.on('resize', this.resize, this);

    // this.scene.launch(SceneKey.TutorialScene);
    // this.scene.pause(SceneKey.FirstStep);
    this.scene.launch(SceneKey.InterfaceScene);
  }

  update(): void {
    this.player.update();

    // "E" label toggle process
    if (
      this.isPlayerOverlapItems(this.trickSourceItems) ||
      (this.isPlayerOverlapItems(this.trickTargetItems) && this.isActionAvailable)
    ) {
      this.player.actionLabel?.setVisible(true);
    } else {
      this.player.actionLabel?.setVisible(false);
    }
  }

  resize(gameSize: Record<string, number>): void {
    const width = gameSize.width;
    const height = gameSize.height;
    this.cameras.resize(width, height);
    this.platforms?.setSize(width, height);
  }

  createTrickTargetItem(itemConfig: TargetItemConfigType): TrickTargetItem {
    const { x, y, originalItemKey, trickedItemKey, actionItemKey } = itemConfig;
    const originalItem = this.add.image(0, 0, originalItemKey);
    const trickedItem = this.add.image(0, 0, trickedItemKey);
    return new TrickTargetItem(this, x, y, [originalItem, trickedItem], actionItemKey);
  }

  isPlayerOverlapItems(items: TrickSourceItem[] | TrickTargetItem[]): boolean {
    const playerBounds = this.player.sprite!.getBounds();
    const itemsBounds = items.map((item) => item.getBounds());
    return itemsBounds.some((itemBound) => {
      return Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, itemBound);
    });
  }

  applyItem(targetItem: TrickTargetItem) {
    this.player.removeItem(targetItem.keyItemId);
    targetItem.trickedItem.setVisible(true);
    targetItem.isTricked = true;
    this.player.isPerformTrick = false;
  }

  pickUpItem(sourceItem: Phaser.GameObjects.Image) {
    this.player.addItem(sourceItem.texture.key);
    this.trickSourceItems = this.trickSourceItems.filter((filteredItem) => filteredItem !== sourceItem);
    sourceItem!.destroy();
    this.player.actionLabel?.setVisible(false);
  }

  addOverlapActionToItems() {
    this.trickSourceItems.forEach((sourceItem) => {
      this.physics.add.collider(sourceItem, this.platforms!);
      this.physics.add.overlap(this.player.sprite!, sourceItem, () => {
        if (this.actionKey!.isDown) {
          this.pickUpItem(sourceItem);
        }
      });
    });

    this.trickTargetItems.forEach((targetItem) => {
      this.physics.add.existing(targetItem, true);
      this.physics.add.overlap(this.player.sprite!, targetItem.originalItem, () => {
        this.isActionAvailable = this.player.inventory.includes(targetItem.keyItemId);
        if (this.isActionAvailable && this.actionKey!.isDown) {
          this.player.isPerformTrick = true;
          this.player.playerSounds?.prank.play();
          this.time.addEvent({
            delay: 1000,
            callback: () => {
              this.applyItem(targetItem);
            },
          });
        }
        if (!this.isActionAvailable) {
          this.player.actionLabel?.setVisible(false);
        }
      });
    });
  }
}
