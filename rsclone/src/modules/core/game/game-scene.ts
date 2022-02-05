import Phaser from 'phaser';
import Player from './player';

import { config } from './game';
import { GameKey, SceneKey } from '../enums/enums';

export default class GameScene extends Phaser.Scene {
  cursor: ReturnType<<T>() => T>;

  player: Player;

  music: Phaser.Sound.BaseSound | undefined;

  platforms: Phaser.Tilemaps.TilemapLayer | undefined;

  width = config.scale.width;

  height = config.scale.height;

  pen: Phaser.GameObjects.Image | undefined;

  sizeWorld = {
    width: 3840,
    height: 1536,
    // heightFloor: 1000,
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
    this.player = new Player();
    this.music = undefined;
    this.playerSounds = {};
  }

  create(): void {
    // this.add.image(0, 0, 'bricks').setOrigin(0, 0).setScale(1);
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('assets', 'assets');
    this.playerSounds.footsteps = this.sound.add(GameKey.SoundFootsteps);
    this.playerSounds.prank = this.sound.add(GameKey.SoundPrank);

    this.music = this.sound.add(GameKey.MusicGame, { volume: 0.1 });
    this.music.play();

    this.platforms = map.createLayer(this.mapLayer.platforms, tileset, 0, 0);
    this.platforms.setCollisionByExclusion([-1], true);

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

    if (spawnPoint.x && spawnPoint.y) {
      this.pen = this.add.image(spawnPoint.x - 1000, spawnPoint.y, GameKey.Pen);
      this.physics.add.existing(this.pen);
      this.physics.add.collider(this.pen, this.platforms);
    }

    this.cursor = this.input.keyboard.createCursorKeys();
    this.scale.on('resize', this.resize, this);

    // this.scene.launch(SceneKey.TutorialScene);
    // this.scene.pause(SceneKey.FirstStep);
    this.scene.launch(SceneKey.InterfaceScene);
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
