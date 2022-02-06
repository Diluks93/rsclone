import { actionLabelConfig } from './../constants/gameTextConfig';
import { Frame, GameKey } from '../enums/enums';

const SPEED = 2000;

export default class Player {
  scene;

  keys;

  sprite;

  playerSounds;

  inventory: string[] = [];

  actionLabel;

  isPerformTrick = false;

  constructor(
    scene: Phaser.Scene,
    x: Phaser.Types.Tilemaps.TiledObject['x'],
    y: Phaser.Types.Tilemaps.TiledObject['y'],
    playerSounds: {
      [index: string]: Phaser.Sound.BaseSound;
    }
  ) {
    if (scene && x && y) {
      this.actionLabel = scene.add.text(x - 10, y - 50, 'E', actionLabelConfig);
      this.actionLabel.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
      this.scene = scene;
      this.playerSounds = playerSounds;

      const anims = scene.anims;
      anims?.create({
        key: 'left',
        frames: anims.generateFrameNumbers(GameKey.Player, { start: Frame.LeftViewStart, end: Frame.LeftViewEnd }),
        frameRate: 10,
        repeat: -1,
      });

      anims?.create({
        key: 'turn',
        frames: [{ key: GameKey.Player, frame: Frame.FrontView }],
        frameRate: 20,
      });

      anims?.create({
        key: 'right',
        frames: anims.generateFrameNumbers(GameKey.Player, { start: Frame.RightViewStart, end: Frame.RightViewEnd }),
        frameRate: 10,
        repeat: -1,
      });

      anims?.create({
        key: 'up',
        frames: anims.generateFrameNumbers(GameKey.Player, { start: Frame.RearViewStart, end: Frame.RearViewEnd }),
        frameRate: 10,
        repeat: -1,
      });

      anims?.create({
        key: 'down',
        frames: anims.generateFrameNumbers(GameKey.Player, { start: Frame.FrontViewStart, end: Frame.FrontViewEnd }),
        frameRate: 10,
        repeat: -1,
      });

      if (x && y) {
        this.sprite = scene.physics.add.sprite(x, y, GameKey.Player, 7).setBounce(0.1).setCollideWorldBounds(true);
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
        // this.playerSounds?.prank.play();
      });
    }
  }

  update(): void {
    const { keys, sprite } = this;

    // trick action disable input
    if (this.isPerformTrick) {
      sprite!.setVelocityX(0);
      sprite!.anims.play('up', true);
      return;
    }

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

    this.actionLabel?.setX(this.sprite!.x - 10);
  }

  addItem(itemKey: string) {
    this.inventory.push(itemKey);
    this.scene!.events.emit('additem', itemKey);
  }

  removeItem(itemKey: string) {
    this.inventory = this.inventory.filter((item) => item !== itemKey);
    this.scene!.events.emit('removeitem', itemKey);
  }
}
