import Phaser from 'phaser';
import PreloadHelper from './preloader-helper';
import Player from './player';
import { config } from './game';

export default class GameScene extends Phaser.Scene {
  cursor: ReturnType<<T>() => T>;
  player: any;
  width = config.width;
  height = config.height;
  size = 0.3;

  constructor () {
    super('first-step');
  }

  preload() {
    PreloadHelper.preload(this)
  }

  create() {
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('assets', 'assets');

    const platforms = map.createLayer('platforms', tileset, 0, 0);
    platforms.setCollisionByExclusion([-1], true)

    const spawnPoint = map.findObject('object', obj => obj.name === 'spawn-point');

    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    // for (let n = 0; n < this.width * 2 / (949 * this.size); n++) {
    //   for (let m = 0; m < 10000; m += 1000) {
    //     this.add.image(949 * n * this.size, m, 'bricks').setOrigin(0, 0).setScale(this.size);
    //     this.add.image(949 * n * this.size, m * this.size, 'bricks').setOrigin(0, 0).setScale(this.size);
    //   }
    // };

    // const rooms = this.createRooms();
    //this.player = this.createPlayer();

    // this.physics.world.bounds.width = 1920;
    // this.physics.world.bounds.height = 768;

    this.cameras.main.setBounds(1920, 568, map.width, map.height)
    //this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.player.sprite, platforms);

    //this.cursor = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update()
  }

  // createRooms(): Phaser.Physics.Arcade.StaticGroup {
  //   const room = this.physics.add.staticGroup();

  //   room.create(this.width * 1.8, this.height / 2.5, WALL_KEY).setOrigin(0, 0).setScale(0.6);

  //   // platforms.create(this.width / 5.35, this.height / 2, GROUND_KEY);
  //   // platforms.create(this.width * 0.813, this.height / 3, GROUND_KEY);

  //   return room;
  // }

  // createPlayer() {
  //   const player = this.physics.add.sprite(this.width * 1.85, this.height / 2, DUDE_KEY, 7);
  //   player.setBounce(0.2);
  //   player.setCollideWorldBounds(true);

  //   this.anims.create({
  //     key: 'left',
  //     frames: this.anims.generateFrameNumbers(DUDE_KEY, {start: 9, end: 11}),
  //     frameRate: 10,
  //     repeat: -1,
  //   });

  //   this.anims.create({
  //     key: 'turn',
  //     frames: [{ key: DUDE_KEY, frame: 7}],
  //     frameRate: 20,
  //   });

  //   this.anims.create({
  //     key: 'right',
  //     frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 3, end: 5 }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });

  //   this.anims.create({
  //     key: 'up',
  //     frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 2 }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });

  //   this.anims.create({
  //     key: 'down',
  //     frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 6, end: 8 }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });

  //   return player;
  // }
}