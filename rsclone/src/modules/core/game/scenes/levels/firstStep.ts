import Phaser from 'phaser';
//import Player from './player';
import Player from '../../entities/voody';
import Neighbor from '../../entities/neighbor';

import { config } from '../../config';
import { GameKey } from '../../../enums/enums';
import { tile, sizeWorld, mapLayer } from '../../../constants/constWorld';
import { Door } from '../../../types/types'

export default class GameScene extends Phaser.Scene {
  protected cursor: ReturnType<<T>() => T>;

  protected player!: Player;

  protected neighbor!: Neighbor;

  protected tile = tile;

  protected mapLayer = mapLayer;

  protected sizeWorld = sizeWorld;

  music: Phaser.Sound.BaseSound | undefined;

  platforms: Phaser.Tilemaps.TilemapLayer | undefined;

  bg: Phaser.Tilemaps.TilemapLayer | undefined;

  bgWindow: Phaser.Tilemaps.TilemapLayer | undefined;

  bgDoors: Phaser.Tilemaps.TilemapLayer | undefined;

  width = config.scale?.width;

  height = config.scale?.height;

  pen: Phaser.GameObjects.Image | undefined;

  playerSounds: {
    [index: string]: Phaser.Sound.BaseSound;
  };

  constructor() {
    super('first-step');
    this.music = undefined;
    this.playerSounds = {};
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map', tileWidth: this.tile, tileHeight: this.tile });
    const tileset = map.addTilesetImage('assets', 'assets');
    this.playerSounds.footsteps = this.sound.add(GameKey.SoundFootsteps);
    this.playerSounds.prank = this.sound.add(GameKey.SoundPrank);

    this.music = this.sound.add(GameKey.MusicGame);
    //this.music.play();
    
    this.platforms = map.createLayer(this.mapLayer.platforms, tileset, 0, 0);
    this.bg = map.createLayer(this.mapLayer.bg, tileset, 0, 0);
    this.bgDoors = map.createLayer(this.mapLayer.bgDoors, tileset, 0, 0);
    this.bgWindow = map.createLayer(this.mapLayer.bgWindow, tileset, 0, 0);
    
    this.platforms.setCollisionByExclusion([-1], true);
    
    const spawnPoint = map.findObject(
      this.mapLayer.object.id, 
      (obj) => obj.name === this.mapLayer.object.name
      );
    this.player = new Player(this, spawnPoint.x as number, spawnPoint.y as number, /* this.playerSounds */);
    this.neighbor = new Neighbor(this, 1000, 1000, GameKey.Neighbor, this.player, 7);

    const fakeObjects = this.physics.add.staticGroup();
    const doorObjects = map.getObjectLayer('doors')['objects'];
    
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
    this.cursor = this.input.keyboard.createCursorKeys();
    if (this.player)
    this.physics.add.overlap(
      this.player, 
      fakeObjects, 
      (player, fakeObjects) => {
        (fakeObjects as Door).setVisible(true);
        if ((this.cursor as Phaser.Types.Input.Keyboard.CursorKeys).space.isDown) {
          this.game.events.emit(GameKey.Fake);
          const setPositionPlayerX = (fakeObjects as Door).x + ((player as Player).width / 2);
          const setPositionPlayerY = (fakeObjects as Door).y + ((player as Player).height / 2);
  
          (player as Player).setPosition(setPositionPlayerX, setPositionPlayerY);
          (fakeObjects as Door).setVisible(false);
        }
        // (this.cursor as Phaser.Types.Input.Keyboard.CursorKeys).space.onDown
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

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.neighbor, (player, neighbor) => {
      (player as Player).getDamage(1);
    });
    this.physics.add.collider(this.neighbor, this.platforms);

    // if (spawnPoint.x && spawnPoint.y) {
    //   this.pen = this.add.image(spawnPoint.x - 1000, spawnPoint.y, GameKey.Pen);
    //   this.physics.add.existing(this.pen);
    //   this.physics.add.collider(this.pen, this.platforms);
    // }

    this.scale.on('resize', this.resize, this);

    // this.scene.launch('tutorial-scene');
    // this.scene.pause('first-step');
    this.scene.launch('ui-scene');
  }

  update(): void {
    this.player.update();
  }

  resize(gameSize: Record<string, number>): void {
    const width = gameSize.width;
    const height = gameSize.height;

    this.cameras.resize(width, height);

    this.platforms?.setSize(width, height);
  }

}
