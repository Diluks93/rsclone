import GameScene from './game-scene';

const DUDE_KEY = 'dude';

export default class Player {
  scene;
  keys;
  sprite;

  constructor(scene: GameScene, x: Phaser.Types.Tilemaps.TiledObject['x'], y: Phaser.Types.Tilemaps.TiledObject['y']) {
    this.scene = scene;

    const anims = scene.anims;
    anims.create({
      key: 'left',
      frames: anims.generateFrameNumbers(DUDE_KEY, {start: 9, end: 11}),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: 'turn',
      frames: [{ key: DUDE_KEY, frame: 7}],
      frameRate: 20,
    });

    anims.create({
      key: 'right',
      frames: anims.generateFrameNumbers(DUDE_KEY, { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: 'up',
      frames: anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: 'down',
      frames: anims.generateFrameNumbers(DUDE_KEY, { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    if (x && y) {
      this.sprite = scene.physics.add
        .sprite(x, y, DUDE_KEY, 7)
        .setBounce(0.1)
        .setCollideWorldBounds(true);
    }

    const { LEFT, RIGHT, UP, DOWN, SPACE } = Phaser.Input.Keyboard.KeyCodes;
      this.keys = scene.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        down: DOWN,
        space: SPACE,
      });
  }

  update() {
    const { keys, sprite } = this;

    if (sprite) {
      if ((keys as Phaser.Types.Input.Keyboard.CursorKeys).left.isDown) {
        sprite.setVelocityX(-160);
        sprite.anims.play('left', true);
      } else if ((keys as Phaser.Types.Input.Keyboard.CursorKeys).right.isDown) {
        sprite.setVelocityX(160);
        sprite.anims.play('right', true);
      } else if ((keys as Phaser.Types.Input.Keyboard.CursorKeys).up.isDown) {
        sprite.setVelocityX(0);
        sprite.anims.play('up', true);
      } else if ((keys as Phaser.Types.Input.Keyboard.CursorKeys).down.isDown) {
        sprite.setVelocityX(0);
        sprite.anims.play('down', true);
      } else {
        sprite.setVelocityX(0);
        sprite.anims.play('turn');
      }
    }
  }

}