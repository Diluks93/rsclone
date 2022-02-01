import Phaser from 'phaser';
import PreloadHelper from './preloader-helper';
import Player from './player';

import { config } from './game';
import { GameKeys } from '../enums/enums';

export default class GameScene extends Phaser.Scene {
  cursor: ReturnType<<T>() => T>;

  player: Player;

  music: Phaser.Sound.BaseSound | undefined;

  width = config.width;

  height = config.height;

  sizeWorld = {
    width: 3840,
    height: 1536,
    heightFloor: 1536 / 2,
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
    super('first-step');
    this.player = new Player();
    this.music = undefined;
    this.playerSounds = {};
  }

  preload(): void {
    PreloadHelper.preload(this);
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('assets', 'assets');
    this.playerSounds.footsteps = this.sound.add(GameKeys.SoundFootsteps);
    this.playerSounds.prank = this.sound.add(GameKeys.SoundPrank);

    this.music = this.sound.add(GameKeys.MusicGame);
    this.music.play();

    const platforms = map.createLayer(this.mapLayer.platforms, tileset, 0, 0);
    platforms.setCollisionByExclusion([-1], true);

    const spawnPoint = map.findObject(this.mapLayer.object.id, (obj) => obj.name === this.mapLayer.object.name);

    this.player = new Player(this, spawnPoint.x, spawnPoint.y, this.playerSounds);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.world.bounds.width = this.sizeWorld.width;
    this.physics.world.bounds.height = this.sizeWorld.height;

    this.physics.world.setBounds(0, this.sizeWorld.heightFloor, this.sizeWorld.width, this.sizeWorld.heightFloor)
    this.cameras.main.setBounds(0, 0, this.sizeWorld.width, this.sizeWorld.height);
    
    if (this.player.sprite) {
      this.cameras.main.startFollow(this.player.sprite);
    }
    this.cameras.main.roundPixels = true;

    if (this.player.sprite) {
      this.physics.add.collider(this.player.sprite, platforms);
    }

    this.cursor = this.input.keyboard.createCursorKeys();
  }

  update(): void {
    this.player.update();
  }
}
