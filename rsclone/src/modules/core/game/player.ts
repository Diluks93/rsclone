import { Frames, GameKeys } from '../enums/enums';

const SPEED = 2000;

export default class Player {
  scene;

  keys;

  sprite;

  playerSounds;

  constructor(
    scene?: Phaser.Scene,
    x?: Phaser.Types.Tilemaps.TiledObject['x'],
    y?: Phaser.Types.Tilemaps.TiledObject['y'],
    playerSounds?: {
      [index: string]: Phaser.Sound.BaseSound;
    }
  ) {
    if (scene && x && y) {
      this.scene = scene;
      this.playerSounds = playerSounds;

      const anims = scene.anims;
      anims?.create({
        key: 'left',
        frames: anims.generateFrameNumbers(GameKeys.Player, { start: Frames.LeftViewStart, end: Frames.LeftViewEnd }),
        frameRate: 10,
        repeat: -1,
      });

      anims?.create({
        key: 'turn',
        frames: [{ key: GameKeys.Player, frame: Frames.FrontView }],
        frameRate: 20,
      });

      anims?.create({
        key: 'right',
        frames: anims.generateFrameNumbers(GameKeys.Player, { start: Frames.RightViewStart, end: Frames.RightViewEnd }),
        frameRate: 10,
        repeat: -1,
      });

      anims?.create({
        key: 'up',
        frames: anims.generateFrameNumbers(GameKeys.Player, { start: Frames.RearViewStart, end: Frames.RearViewEnd }),
        frameRate: 10,
        repeat: -1,
      });

      anims?.create({
        key: 'down',
        frames: anims.generateFrameNumbers(GameKeys.Player, { start: Frames.FrontViewStart, end: Frames.FrontViewEnd }),
        frameRate: 10,
        repeat: -1,
      });

      if (x && y) {
        this.sprite = scene.physics.add.sprite(x, y, GameKeys.Player, 7).setBounce(0.1).setCollideWorldBounds(true);
      }

      const { LEFT, RIGHT, UP, DOWN, SPACE } = Phaser.Input.Keyboard.KeyCodes;
      this.keys = scene.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        down: DOWN,
        space: SPACE,
      });

      scene.input.keyboard.on('keydown-' + 'E', () => {
        this.playerSounds?.prank.play();
      });
    }
  }

  update(): void {
    const { keys, sprite } = this;

    if (sprite) {
      this.playerSounds?.footsteps.on('keyup', () => {
        console.log(123);

        this.playerSounds?.footsteps.play();
      });
      if ((keys as Phaser.Types.Input.Keyboard.CursorKeys).left.isDown) {
        sprite.setVelocityX(-SPEED);
        sprite.anims.play('left', true);
      } else if ((keys as Phaser.Types.Input.Keyboard.CursorKeys).right.isDown) {
        sprite.setVelocityX(SPEED);
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

      if (
        (keys as Phaser.Types.Input.Keyboard.CursorKeys).left.isUp &&
        (keys as Phaser.Types.Input.Keyboard.CursorKeys).right.isUp &&
        (keys as Phaser.Types.Input.Keyboard.CursorKeys).up.isUp &&
        (keys as Phaser.Types.Input.Keyboard.CursorKeys).down.isUp
      ) {
        this.playerSounds?.footsteps.play();
      }
    }
  }
}
