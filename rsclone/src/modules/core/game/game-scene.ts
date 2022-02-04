import Phaser from 'phaser';
//import Player from './player';
import { Player } from './voody';

import { config } from './game';
import { GameKey } from '../enums/enums';

export default class GameScene extends Phaser.Scene {
  cursor: ReturnType<<T>() => T>;

  private player!: Player;

  music: Phaser.Sound.BaseSound | undefined;

  platforms: Phaser.Tilemaps.TilemapLayer | undefined;
  bg: Phaser.Tilemaps.TilemapLayer | undefined;
  bgWindow: Phaser.Tilemaps.TilemapLayer | undefined;
  bgDoors: Phaser.Tilemaps.TilemapLayer | undefined;
  doors: any;

  width = config.scale?.width;

  height = config.scale?.height;

  pen: Phaser.GameObjects.Image | undefined;

  tile = 32;

  sizeWorld = {
    width: 3840,
    height: 1536,
  };

  mapLayer = {
    platforms: 'platforms',
    bg: 'bg',
    bgWindow: 'bgWindow',
    bgDoors: 'bgDoors',
    object: {
      id: 'object',
      name: 'spawn-point',
    },
    doors: {
      id: 'doors',
      name: '',
    }
  };

  playerSounds: {
    [index: string]: Phaser.Sound.BaseSound;
  };

  constructor() {
    super('first-step');
    // this.player = new Player();
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
    let fakeObjects = this.physics.add.staticGroup();
    const doorObjects = map.getObjectLayer('doors')['objects'];
    
    doorObjects.forEach((doorObject, i, arr) => {
      let obj = fakeObjects.create(doorObject.x, doorObject.y as number).setOrigin(0, 0);
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
      (player, fakeObjects: any) => {
        if ((this.cursor as Phaser.Types.Input.Keyboard.CursorKeys).space.isDown) {
          const setPositionPlayerX = fakeObjects.x + (this.player.width / 2);
          const setPositionPlayerY = fakeObjects.y + (this.player.height / 2);
  
          this.player.setPosition(setPositionPlayerX, setPositionPlayerY);
        }
      }, 
      ) 
    console.log(this.cursor)
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.world.bounds.width = this.sizeWorld.width;
    this.physics.world.bounds.height = this.sizeWorld.height;

    this.cameras.main.setBounds(0, 0, this.sizeWorld.width, this.sizeWorld.height);

    if (this.player) {
      this.cameras.main.startFollow(this.player);
    }
    this.cameras.main.roundPixels = true;

    if (this.player) {
      this.physics.add.collider(this.player, this.platforms);
    }

    // if (spawnPoint.x && spawnPoint.y) {
    //   this.pen = this.add.image(spawnPoint.x - 1000, spawnPoint.y, GameKey.Pen);
    //   this.physics.add.existing(this.pen);
    //   this.physics.add.collider(this.pen, this.platforms);
    // }

    this.scale.on('resize', this.resize, this);

    // this.scene.launch('tutorial-scene');
    // this.scene.pause('first-step');
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

  // colliderDoor(player: any, fakeObjects: any): void {

  //   const setPositionPlayerX = fakeObjects.x + (player.width / 2);
  //   const setPositionPlayerY = fakeObjects.y + (player.height / 2);

  //   player.setPosition(setPositionPlayerX, setPositionPlayerY);
  // }
}
