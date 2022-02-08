import Phaser from 'phaser';
import Player from '../../entities/player';
import Neighbor from '../../entities/neighbor';
import TrickSourceItem from '../../helpers/trickSourceItem';
import TrickTargetItem from '../../helpers/trickTargetItem';

import { config } from '../../config';
import { GameKey, SceneKey } from '../../../enums/enums';
import { tile, sizeWorld, mapLayer } from '../../../constants/constWorld';
import { Door, TargetItemConfigType } from '../../../types/types';
import { settingsStore } from '../../../stores/settingsStore';

export default class GameScene extends Phaser.Scene {
  protected cursor: ReturnType<<T>() => T>;
  protected player!: Player;
  protected neighbor!: Neighbor;
  protected tile = tile;
  protected mapLayer = mapLayer;
  protected sizeWorld = sizeWorld;
  trickSourceItems: TrickSourceItem[] = [];
  trickTargetItems: TrickTargetItem[] = [];
  actionKeyE: Phaser.Input.Keyboard.Key | undefined;
  actionKeySpace: Phaser.Input.Keyboard.Key | undefined;
  music: Phaser.Sound.BaseSound | undefined;
  floor: Phaser.Tilemaps.TilemapLayer | undefined;
  bg: Phaser.Tilemaps.TilemapLayer | undefined;
  bgWindow: Phaser.Tilemaps.TilemapLayer | undefined;
  bgDoors: Phaser.Tilemaps.TilemapLayer | undefined;
  width = config.scale?.width;
  height = config.scale?.height;
  isActionAvailable = false;
  pen: Phaser.GameObjects.Image | undefined;
  playerSounds: {
    [index: string]: Phaser.Sound.BaseSound;
  };

  constructor() {
    super({ key: SceneKey.FirstStep });
    this.playerSounds = {};
  }

  create(): void {
    this.actionKeyE = this.input.keyboard.addKey('E');
    this.actionKeySpace = this.input.keyboard.addKey(32);

    const map = this.make.tilemap({ key: 'map', tileWidth: this.tile, tileHeight: this.tile });
    const tileset = map.addTilesetImage('assets', 'assets');
    const soundConfig = { volume: Number(settingsStore.volumeValue) };

    this.playerSounds.footsteps = this.sound.add(GameKey.SoundFootsteps, soundConfig);
    this.playerSounds.prank = this.sound.add(GameKey.SoundPrank, soundConfig);
    this.music = this.sound.add(GameKey.MusicGame, soundConfig);
    this.music.play();
    
    this.floor = map.createLayer(this.mapLayer.platforms, tileset, 0, 0);
    this.bg = map.createLayer(this.mapLayer.bg, tileset, 0, 0);
    this.bgDoors = map.createLayer(this.mapLayer.bgDoors, tileset, 0, 0);
    this.bgWindow = map.createLayer(this.mapLayer.bgWindow, tileset, 0, 0);
    
    this.floor.setCollisionByExclusion([-1], true);

    const picture = this.createTrickTargetItem({
      x: 1600,
      y: 1200,
      originalItemKey: GameKey.Picture,
      trickedItemKey: GameKey.TrickedPicture,
      actionItemKey: GameKey.Pen,
    });
    this.trickTargetItems.push(picture);

    const spawnPoint = map.findObject(this.mapLayer.object.id, (obj) => obj.name === this.mapLayer.object.name);

    this.player = new Player(this, spawnPoint.x as number, spawnPoint.y as number, this.playerSounds);
    this.neighbor = new Neighbor(this, 3700, 1300, GameKey.Neighbor, this.player, 7);

    const pen = new TrickSourceItem(this, spawnPoint.x as number, spawnPoint.y as number, GameKey.Pen);
    this.trickSourceItems.push(pen);

    const fakeObjects = this.physics.add.staticGroup();
    const doorObjects = map.getObjectLayer('doors')['objects'];
    this.establishObjectOfDoor(doorObjects, fakeObjects);

    this.cursor = this.input.keyboard.createCursorKeys();
    if (this.player)
    this.physics.add.overlap(
      this.player, 
      fakeObjects, 
      (player, fakeObjects) => {
        (fakeObjects as Door).setVisible(true);
        if /* ((this.cursor as Phaser.Types.Input.Keyboard.CursorKeys).space.isDown) */ (this.actionKeySpace?.isDown){
          this.game.events.emit(GameKey.Fake);
          const setPositionPlayerX = (fakeObjects as Door).x + ((player as Player).width / 2);
          const setPositionPlayerY = (fakeObjects as Door).y + ((player as Player).height / 2);
  
          (player as Player).setPosition(setPositionPlayerX, setPositionPlayerY);
          (fakeObjects as Door).setVisible(false);
        }
      },
      undefined,
      this
      ) 

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cameras.main.setBounds(0, 0, this.sizeWorld.width, this.sizeWorld.height);
    if (this.player) {
      this.cameras.main.startFollow(this.player);
    }
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.player, this.floor);
    this.physics.add.collider(this.player, this.neighbor, (player, neighbor) => {
      (player as Player).getDamage(1);
    });
    this.physics.add.collider(this.neighbor, this.floor);
    this.addOverlapActionToItems();
    this.scale.on('resize', this.resize, this);

    this.scene.launch(SceneKey.TutorialScene);
    this.scene.launch(SceneKey.InterfaceScene);
    this.scene.pause(SceneKey.FirstStep);
  }

  update(): void {
    this.player.update();

    if (this.isPlayerOverlapActiveItems()) {
      this.player.actionLabel?.setVisible(true);
    } else {
      this.player.actionLabel?.setVisible(false);
    }
  }

  private establishObjectOfDoor(doorObjects: Phaser.Types.Tilemaps.TiledObject[], fakeObjects: Phaser.Physics.Arcade.StaticGroup) {
    doorObjects.forEach((doorObject, i, arr) => {
      const obj = fakeObjects.create(doorObject.x, doorObject.y, GameKey.Fake).setOrigin(0, 0);
      fakeObjects.setVisible(false);
      obj.body.width = doorObject.width;
      obj.body.height = doorObject.height;
      for (let j = 0; j < arr.length; j++) {
        if (doorObject.id === arr[j].properties[0].value) {
          obj.body.x = arr[j].x;
          obj.body.y = arr[j].y;
        }
      }
    });
  }

  private resize(gameSize: Record<string, number>): void {
    const width = gameSize.width;
    const height = gameSize.height;
    this.cameras.resize(width, height);
    this.floor?.setSize(width, height);
  }

  private createTrickTargetItem(itemConfig: TargetItemConfigType): TrickTargetItem {
    const { x, y, originalItemKey, trickedItemKey, actionItemKey } = itemConfig;
    const originalItem = this.add.image(0, 0, originalItemKey);
    const trickedItem = this.add.image(0, 0, trickedItemKey);

    return new TrickTargetItem(this, x, y, [originalItem, trickedItem], actionItemKey);
  }

  private isPlayerOverlapItems(items: TrickSourceItem[] | TrickTargetItem[]): boolean {
    const playerBounds = this.player.getBounds();
    const itemsBounds = items.map((item) => item.getBounds());

    return itemsBounds.some((itemBound) => {
      return Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, itemBound);
    });
  }

  private applyItem(targetItem: TrickTargetItem): void {
    this.player.removeItem(targetItem.keyItemId);
    targetItem.trickedItem.setVisible(true);
    targetItem.isTricked = true;
    this.player.isPerformTrick = false;
  }

  private pickUpItem(sourceItem: Phaser.GameObjects.Image): void {
    this.player.addItem(sourceItem.texture.key);
    this.trickSourceItems = this.trickSourceItems.filter((filteredItem) => filteredItem !== sourceItem);
    sourceItem!.destroy();
    this.player.actionLabel?.setVisible(false);
  }

  private addOverlapActionToItems(): void {
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

  private isPlayerOverlapActiveItems(): boolean {
    
    return (
      this.isPlayerOverlapItems(this.trickSourceItems) ||
      (this.isPlayerOverlapItems(this.trickTargetItems) && this.isActionAvailable)
    );
  }
};
