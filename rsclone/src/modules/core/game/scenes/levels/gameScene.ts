import Phaser from 'phaser';
import Player from '../../entities/player';
import TrickSourceItem from '../../helpers/trickSourceItem';
import TrickTargetItem from '../../helpers/trickTargetItem';

import { gameConfig } from '../../config';
import { EventName, GameKey } from '../../../enums/enums';
import { tile, sizeWorld, mapLayer } from '../../../constants/constWorld';
import { DoorWayInterface, TargetItemConfigType } from '../../../types/types';
import { settingsStore } from '../../../stores/settingsStore';
import DoorWay from '../../helpers/doorWay';

export default abstract class GameScene extends Phaser.Scene {
  private tile = tile;

  private sizeWorld = sizeWorld;

  private actionKeyE: Phaser.Input.Keyboard.Key | undefined;

  private music: Phaser.Sound.BaseSound | undefined;

  private bg: Phaser.Tilemaps.TilemapLayer | undefined;

  private bgWindow: Phaser.Tilemaps.TilemapLayer | undefined;

  private bgDoors: Phaser.Tilemaps.TilemapLayer | undefined;

  private width = gameConfig.scale?.width;

  private height = gameConfig.scale?.height;

  private isActionAvailable = false;

  private playerSounds: {
    [index: string]: Phaser.Sound.BaseSound;
  };

  protected cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  protected player!: Player;

  protected map: Phaser.Tilemaps.Tilemap | undefined;

  protected trickSourceItems: TrickSourceItem[] = [];

  protected trickTargetItems: TrickTargetItem[] = [];

  protected floor: Phaser.Tilemaps.TilemapLayer | undefined;

  protected mapLayer = mapLayer;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
    this.playerSounds = {};
  }

  public create(): void {
    this.actionKeyE = this.input.keyboard.addKey('E');

    this.map = this.make.tilemap({ key: 'map', tileWidth: this.tile, tileHeight: this.tile });
    const tileset = this.map.addTilesetImage('assets', 'assets');
    const soundConfig = { volume: Number(settingsStore.volumeValue) };

    this.playerSounds.footsteps = this.sound.add(GameKey.SoundFootsteps, soundConfig);
    this.playerSounds.trick = this.sound.add(GameKey.SoundTrick, soundConfig);
    this.music = this.sound.add(GameKey.MusicGame, soundConfig);
    this.music.play();

    this.floor = this.map.createLayer(this.mapLayer.platforms, tileset, 0, 0);
    this.bg = this.map.createLayer(this.mapLayer.bg, tileset, 0, 0);
    this.bgDoors = this.map.createLayer(this.mapLayer.bgDoors, tileset, 0, 0);
    this.bgWindow = this.map.createLayer(this.mapLayer.bgWindow, tileset, 0, 0);

    this.floor.setCollisionByExclusion([-1], true);

    const spawnPoint = this.map.findObject(
      this.mapLayer.object.id.object,
      (obj) => obj.name === this.mapLayer.object.name.spawnPlayer
    );
    this.player = new Player(this, spawnPoint.x as number, spawnPoint.y as number, this.playerSounds);

    const mapDoorsLayer = this.map.getObjectLayer('doors').objects;
    const doorWaysGroup = this.physics.add.staticGroup();
    this.createDoorWays(mapDoorsLayer, doorWaysGroup);

    this.cursor = this.input.keyboard.createCursorKeys();
    if (this.player)
      this.physics.add.overlap(
        this.player,
        doorWaysGroup,
        (actor, object) => {
          const currentDoorWay = object as DoorWayInterface;
          const { nextDoorWayId } = currentDoorWay;
          const nextDoorWay = this.getNextDoorWay(doorWaysGroup, nextDoorWayId) as DoorWayInterface;
          nextDoorWay.setVisible(true);

          const spaceKey = (this.cursor as Phaser.Types.Input.Keyboard.CursorKeys).space;

          if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
            const player = actor as Player;
            player.moveToDoor(currentDoorWay, true);

            this.time.addEvent({
              delay: 300,
              callback: () => {
                player.moveToDoor(nextDoorWay, false);
                doorWaysGroup.setVisible(false);

                if (!currentDoorWay.isScored) {
                  this.game.events.emit(EventName.IncreaseScore);
                  currentDoorWay.isScored = true;
                  nextDoorWay.isScored = true;
                }
              },
            });
          }
        },
        undefined,
        this
      );

    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.cameras.main.setBounds(0, 0, this.sizeWorld.width, this.sizeWorld.height);
    if (this.player) this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.player, this.floor);
    this.addOverlapActionToItems();
    this.scale.on('resize', this.resize, this);
  }

  update(): void {
    this.player.update();

    // "E" label toggle process
    if (this.isPlayerOverlapActiveItems()) {
      this.player.actionLabel?.setVisible(true);
    } else {
      this.player.actionLabel?.setVisible(false);
    }
  }

  private createDoorWays(
    doorObjects: Phaser.Types.Tilemaps.TiledObject[],
    doorWaysGroup: Phaser.Physics.Arcade.StaticGroup
  ): void {
    doorObjects.forEach((doorObject: Phaser.Types.Tilemaps.TiledObject) => {
      const { x, y, id } = doorObject;
      const nextDoorId = doorObject.properties[0].value;
      const fakeDoorObject = new DoorWay(this, x!, y!, GameKey.FakeDoor, nextDoorId, id);
      doorWaysGroup.add(fakeDoorObject);
    });
  }

  private resize(gameSize: Record<string, number>): void {
    const width = gameSize.width;
    const height = gameSize.height;
    this.cameras.resize(width, height);
    this.floor?.setSize(width, height);
  }

  private isPlayerOverlapActiveItems(): boolean {
    return (
      this.isPlayerOverlapItems(this.trickSourceItems) ||
      (this.isPlayerOverlapItems(this.trickTargetItems) && this.isActionAvailable)
    );
  }

  protected createTrickTargetItem(itemConfig: TargetItemConfigType): TrickTargetItem {
    const { x, y, originalItemKey, trickedItemKey, actionItemKey } = itemConfig;
    const originalItem = this.add.image(0, 0, originalItemKey);
    const trickedItem = this.add.image(0, 0, trickedItemKey);

    return new TrickTargetItem(this, x, y, [originalItem, trickedItem], actionItemKey);
  }

  protected isPlayerOverlapItems(items: TrickSourceItem[] | TrickTargetItem[]): boolean {
    const playerBounds = this.player.getBounds();
    const itemsBounds = items.map((item) => item.getBounds());

    return itemsBounds.some((itemBound) => {
      return Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, itemBound);
    });
  }

  protected finishTrick(targetItem: TrickTargetItem): void {
    this.player.removeItem(targetItem.keyItemId);
    targetItem.trickedItem.setVisible(true);
    targetItem.isTricked = true;
  }

  protected pickUpItem(sourceItem: Phaser.GameObjects.Image): void {
    this.player.addItem(sourceItem.texture.key);
    this.trickSourceItems = this.trickSourceItems.filter((filteredItem) => filteredItem !== sourceItem);
    sourceItem!.destroy();
  }

  protected addOverlapActionToItems(): void {
    this.trickSourceItems.forEach((sourceItem) => {
      this.physics.add.collider(sourceItem, this.floor!);
      this.physics.add.overlap(this.player, sourceItem, () => {
        if (this.actionKeyE!.isDown) {
          this.pickUpItem(sourceItem);
        }
      });
    });

    this.trickTargetItems.forEach((targetItem) => {
      this.physics.add.existing(targetItem, true);
      this.physics.add.overlap(this.player, targetItem.originalItem, () => {
        this.isActionAvailable = this.player.inventory.includes(targetItem.keyItemId);
        if (this.isActionAvailable && this.actionKeyE!.isDown) {
          if (Phaser.Input.Keyboard.JustDown(this.actionKeyE!)) {
            this.game.events.emit(EventName.IncreaseScore);
          }
          this.player.startTrick();
          this.time.addEvent({
            delay: 1000,
            callback: () => {
              this.finishTrick(targetItem);
            },
          });
        }
        if (!this.isActionAvailable) {
          this.player.actionLabel?.setVisible(false);
        }
      });
    });
  }

  protected getNextDoorWay(
    doorWays: Phaser.Physics.Arcade.StaticGroup,
    nextDoorWayId: number
  ): Phaser.GameObjects.GameObject {
    return doorWays.children.getArray().filter((doorWay) => (doorWay as DoorWayInterface).id === nextDoorWayId)[0];
  }
}
