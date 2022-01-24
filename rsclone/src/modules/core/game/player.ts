import GameScene from './gameScene';
import { Frames, GameKeys } from '../enums/enums';

export default class Player {
  scene;
  keys;
  sprite;

  constructor(scene?: GameScene, x?: Phaser.Types.Tilemaps.TiledObject['x'], y?: Phaser.Types.Tilemaps.TiledObject['y']) {
    this.scene = scene;

    const anims = scene?.anims;
    anims?.create({
      key: 'left',
      frames: anims.generateFrameNumbers(GameKeys.DUDE_KEY, {start: Frames.leftViewStart, end: Frames.leftViewEnd}),
      frameRate: 10,
      repeat: -1,
    });

    anims?.create({
      key: 'turn',
      frames: [{ key: GameKeys.DUDE_KEY, frame: Frames.frontView}],
      frameRate: 20,
    });

    anims?.create({
      key: 'right',
      frames: anims.generateFrameNumbers(GameKeys.DUDE_KEY, { start: Frames.rightViewStart, end: Frames.rightViewEnd }),
      frameRate: 10,
      repeat: -1,
    });

    anims?.create({
      key: 'up',
      frames: anims.generateFrameNumbers(GameKeys.DUDE_KEY, { start: Frames.rearViewStart, end: Frames.rearViewEnd }),
      frameRate: 10,
      repeat: -1,
    });

    anims?.create({
      key: 'down',
      frames: anims.generateFrameNumbers(GameKeys.DUDE_KEY, { start: Frames.frontViewStart, end: Frames.frontViewEnd }),
      frameRate: 10,
      repeat: -1,
    });

    if (x && y && scene) {
      this.sprite = scene.physics.add
        .sprite(x, y, GameKeys.DUDE_KEY, 7)
        .setBounce(0.1)
        .setCollideWorldBounds(true);
    }

    const { LEFT, RIGHT, UP, DOWN, SPACE, ESC, } = Phaser.Input.Keyboard.KeyCodes;
      this.keys = scene?.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        down: DOWN,
        space: SPACE,
        esc: ESC
      });
  }

  update(): void {
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