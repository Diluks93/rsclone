import { GameImageKey } from './../../../enums/enums';
import Phaser from 'phaser';
import TrickSourceItem from '../../helpers/trickSourceItem';
import TrickTargetItem from '../../helpers/trickTargetItem';
import gameTranslation from '../../../data/gameTranslation.json';
import DoorWay from '../../helpers/doorWay';
import Neighbor from '../../entities/neighbor';
import Actor from '../../entities/actor';
import { EventName, FrameKey, GameKey, StorageKey } from '../../../enums/enums';
import { tile, sizeWorld, mapLayer } from '../../../constants/constWorld';
import { DoorWayInterface, TargetItemConfigType } from '../../../types/types';
import { settingsStore } from '../../../stores/settingsStore';
import { Player } from '../../entities/player';

export default abstract class GameScene extends Phaser.Scene {
  private tile = tile;

  private sizeWorld = sizeWorld;

  private actionKeyE: Phaser.Input.Keyboard.Key | undefined;

  private music: Phaser.Sound.BaseSound | undefined;

  private isActionAvailable = false;

  private playerSounds: {
    [index: string]: Phaser.Sound.BaseSound;
  };

  protected cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  protected player!: Player;

  protected neighbor!: Neighbor;

  protected map: Phaser.Tilemaps.Tilemap | undefined;

  protected trickSourceItems: TrickSourceItem[] = [];

  protected trickTargetItems: TrickTargetItem[] = [];

  protected floor: Phaser.Tilemaps.TilemapLayer | undefined;

  protected mapLayer = mapLayer;

  public doorwaysGroup: Phaser.Physics.Arcade.StaticGroup | undefined;

  public winScore = 0;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
    this.playerSounds = {};
  }

  public create(): void {
    // controls
    this.cursor = this.input.keyboard.createCursorKeys();
    this.actionKeyE = this.input.keyboard.addKey('E');

    // sounds
    this.map = this.make.tilemap({ key: 'map', tileWidth: this.tile, tileHeight: this.tile });
    const hasSoundResolution: boolean = JSON.parse(localStorage.getItem(StorageKey.SoundCheckbox) as string);
    const soundConfig = { volume: Number(localStorage.getItem(StorageKey.SoundVolume) || '0.5') };
    const backgroundMusicConfig = { volume: Number(localStorage.getItem(StorageKey.BackgroundMusicVolume) || '0.5') };

    this.playerSounds.footsteps = this.sound.add(GameKey.SoundFootsteps, soundConfig);
    this.playerSounds.trick = this.sound.add(GameKey.SoundTrick, soundConfig);
    this.playerSounds.delight = this.sound.add(GameKey.SoundPlayerDelighted, soundConfig);
    this.playerSounds.fright = this.sound.add(GameKey.SoundPlayerFright, soundConfig);
    this.playerSounds.doorOpen = this.sound.add(GameKey.SoundDoorOpen, soundConfig);
    this.music = this.sound.add(GameKey.MusicGame, backgroundMusicConfig);
    if (hasSoundResolution || hasSoundResolution === null) {
      this.music.play();
    }

    // tilemap layers
    this.map = this.make.tilemap({ key: 'map', tileWidth: this.tile, tileHeight: this.tile });
    const tileset = this.map.addTilesetImage('assets', 'assets');
    this.floor = this.map.createLayer(this.mapLayer.platforms, tileset, 0, 0);
    this.floor.setCollisionByExclusion([-1], true);
    const mapLayers = [this.mapLayer.bg, this.mapLayer.bgDoors, this.mapLayer.bgWindow];
    mapLayers.forEach((layer: string) => {
      this.map?.createLayer(layer, tileset, 0, 0);
    });

    // player
    const playerSpawnPoint = this.getNeighborSpawnPoint('object', 'spawnPlayer');
    this.player = new Player(
      this,
      playerSpawnPoint?.x as number,
      playerSpawnPoint?.y as number,
      GameKey.Player,
      FrameKey.WoodyFrontMiddle,
      this.playerSounds
    );

    // neighbor
    const neighborSpawnPoint = this.getNeighborSpawnPoint('neighbor', 'spawnNeighbor');
    if (settingsStore.currentLevel > 0) {
      this.neighbor = new Neighbor(
        this,
        neighborSpawnPoint?.x as number,
        neighborSpawnPoint?.y as number,
        GameKey.Neighbor,
        this.player,
        FrameKey.NeighborFrontMiddle
      );
    }

    // camera
    this.cameras.main.setBounds(0, 0, this.sizeWorld.width, this.sizeWorld.height);
    if (this.player) {
      this.cameras.main.startFollow(this.player);
    }
    this.cameras.main.roundPixels = true;

    // doorways
    const mapDoorsLayer = this.map.getObjectLayer('doors').objects;
    this.doorwaysGroup = this.physics.add.staticGroup();
    this.createDoorways(mapDoorsLayer, this.doorwaysGroup);

    // overlaps
    this.physics.add.overlap(this.player, this.doorwaysGroup, this.addMoveToNextDoorway, undefined, this);
    if (settingsStore.currentLevel > 0) {
      this.physics.add.overlap(this.neighbor, this.doorwaysGroup, this.addMoveToNextDoorway, undefined, this);
      this.physics.add.overlap(this.neighbor, this.trickTargetItems, this.addAngerReactionToNeighbor, undefined, this);
    }

    // physics
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.physics.add.collider(this.player, this.floor);
    this.scale.on('resize', this.resize, this);
    this.addOverlapActionToItems();
  }

  update(): void {
    this.player.update();
    if (this.neighbor) {
      this.neighbor.update();
    }
    const { spaceText } = gameTranslation[settingsStore.languageValue];
    const { eKeyText } = gameTranslation[settingsStore.languageValue];
    if (this.isActorOverlapDoors(this.player, this.doorwaysGroup!)) {
      this.player.actionLabel?.setVisible(true);
      this.player.actionLabel.setText(spaceText);
    } else if (this.isPlayerOverlapActiveItems()) {
      this.player.actionLabel?.setVisible(true);
      this.player.actionLabel.setText(eKeyText);
    } else {
      this.player.actionLabel?.setVisible(false);
    }
  }

  private getNeighborSpawnPoint(objectId: string, objectName: string): Phaser.Types.Tilemaps.TiledObject | undefined {
    return this.map?.findObject(
      this.mapLayer?.object.id[objectId],
      (obj) => obj.name === this.mapLayer.object.name[objectName]
    );
  }

  private createDoorways(
    doorObjects: Phaser.Types.Tilemaps.TiledObject[],
    doorwaysGroup: Phaser.Physics.Arcade.StaticGroup
  ): void {
    doorObjects.forEach((doorObject: Phaser.Types.Tilemaps.TiledObject) => {
      const { x, y, id } = doorObject;
      const nextDoorId = doorObject.properties[0].value;
      const fakeDoorObject = new DoorWay(this, x!, y!, GameImageKey.FakeDoor, nextDoorId, id);
      doorwaysGroup.add(fakeDoorObject);
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
      this.isActorOverlapItems(this.player, this.trickSourceItems) ||
      (this.isActorOverlapItems(this.player, this.trickTargetItems) && this.isActionAvailable)
    );
  }

  protected createTrickTargetItem(itemConfig: TargetItemConfigType): TrickTargetItem {
    const { x, y, originalItemKey, trickedItemKey, actionItemKey } = itemConfig;
    const originalItem = this.add.image(0, 0, originalItemKey);
    const trickedItem = this.add.image(0, 0, trickedItemKey);

    return new TrickTargetItem(this, x, y, [originalItem, trickedItem], actionItemKey);
  }

  protected isActorOverlapDoors(actor: Actor, doorways: Phaser.Physics.Arcade.StaticGroup): boolean {
    const actorBounds = actor.getBounds();
    const doorwaysBounds = doorways.children.getArray().map((doorWay) => (doorWay as DoorWayInterface).getBounds());

    return doorwaysBounds.some((doorWayBound) => {
      return Phaser.Geom.Intersects.RectangleToRectangle(actorBounds, doorWayBound);
    });
  }

  protected isActorOverlapItems(actor: Actor, items: TrickSourceItem[] | TrickTargetItem[]): boolean {
    const actorBounds = actor.getBounds();
    const itemsBounds = items.map((item) => item.getBounds());

    return itemsBounds.some((itemBound) => {
      return Phaser.Geom.Intersects.RectangleToRectangle(actorBounds, itemBound);
    });
  }

  protected pickUpItem(sourceItem: Phaser.GameObjects.Image): void {
    this.player.addItem(sourceItem.texture.key);
    this.trickSourceItems = this.trickSourceItems.filter((filteredItem) => filteredItem !== sourceItem);
    sourceItem!.destroy();
  }

  protected addAngerReactionToNeighbor(
    objectA: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    objectB: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    const neighbor = objectA as Neighbor;
    const trickTargetItem = objectB as TrickTargetItem;
    if (trickTargetItem.isTricked) {
      neighbor.isAngry = true;
      trickTargetItem.isTricked = false;
      this.time.addEvent({
        delay: 500,
        callback: () => {
          trickTargetItem.fixTrick();
          neighbor.isAngry = false;
          this.game.events.emit(EventName.IncreaseScore);
        },
      });
    }
  }

  protected addMoveToNextDoorway(
    objectA: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    objectB: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    const currentDoorWay = objectB as DoorWayInterface;
    const { nextDoorWayId } = currentDoorWay;
    const nextDoorWay = this.getNextDoorWay(this.doorwaysGroup!, nextDoorWayId) as DoorWayInterface;
    nextDoorWay.setVisible(true);

    const spaceKey = (this.cursor as Phaser.Types.Input.Keyboard.CursorKeys).space;

    const actor = objectA as Actor;
    if (actor instanceof Neighbor && !actor.hasChangedRoom) {
      actor.moveToDoor(currentDoorWay, true);
      this.time.addEvent({
        delay: 300,
        callback: () => {
          actor.hasChangedRoom = true;
          actor.moveToDoor(nextDoorWay, false);
          this.doorwaysGroup!.setVisible(false);
        },
      });
    }
    if (actor instanceof Player && Phaser.Input.Keyboard.JustDown(spaceKey)) {
      actor.moveToDoor(currentDoorWay, true);
      this.time.addEvent({
        delay: 300,
        callback: () => {
          if (!currentDoorWay.isScored) {
            this.game.events.emit(EventName.IncreaseScore);
            currentDoorWay.isScored = true;
            nextDoorWay.isScored = true;
          }
          actor.moveToDoor(nextDoorWay, false);
          this.doorwaysGroup!.setVisible(false);
        },
      });
    }
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
          let ePressed = false;
          if (Phaser.Input.Keyboard.JustDown(this.actionKeyE!)) {
            ePressed = true;
          }
          this.player.startTrick();
          this.time.addEvent({
            delay: 1000,
            callback: () => {
              this.player.finishTrick(targetItem);
              if (ePressed) {
                this.game.events.emit(EventName.IncreaseScore);
              }
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
    doorways: Phaser.Physics.Arcade.StaticGroup,
    nextDoorWayId: number
  ): Phaser.GameObjects.GameObject {
    return doorways.children.getArray().filter((doorWay) => (doorWay as DoorWayInterface).id === nextDoorWayId)[0];
  }
}
