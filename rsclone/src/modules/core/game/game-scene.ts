import Phaser from 'phaser';

const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude';

export default class GameScene extends Phaser.Scene {
  cursor: ReturnType<<T>() => T>;
  player: any;

  constructor () {
    super('game-scene');
    this.cursor = undefined;
    this.player = undefined;
  }

  width = window.innerWidth;
  height = window.innerHeight;

  preload() {
    this.load.setBaseURL('https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source');
    
    this.load.image('sky', 'game/sky.png');
    this.load.image(GROUND_KEY, 'game/platform.png');
    this.load.image('star', 'game/star.png');
    this.load.image('bomb', 'game/bomb.png');
    this.load.spritesheet(DUDE_KEY, 'game/old-voody.png', { frameWidth: 195, frameHeight: 240 });
  }

  create() {
    this.add.image(this.width / 2, this.height / 2, 'sky').setScale(2);
    const platforms = this.createPlatforms();
    this.player = this.createPlayer();

    this.physics.add.collider(this.player, platforms);

    this.cursor = this.input.keyboard.createCursorKeys();
  }

  update() {
    if ((this.cursor as Phaser.Types.Input.Keyboard.CursorKeys).left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if ((this.cursor as Phaser.Types.Input.Keyboard.CursorKeys).right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }
    if ((this.cursor as Phaser.Types.Input.Keyboard.CursorKeys).up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-530);
    }
  }

  createPlatforms(): Phaser.Physics.Arcade.StaticGroup {
    const platforms = this.physics.add.staticGroup();

    platforms.create(this.width / 2, this.height, GROUND_KEY).setScale(4).refreshBody();

    platforms.create(this.width * 0.813, this.height * 0.75, GROUND_KEY);
    platforms.create(this.width / 5.35, this.height / 2, GROUND_KEY);
    platforms.create(this.width * 0.813, this.height / 3, GROUND_KEY);

    return platforms;
  }

  createPlayer(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    const player = this.physics.add.sprite(this.width / 2, this.height / 2, DUDE_KEY).setScale(0.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, {start: 0, end: 2}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: DUDE_KEY, frame: 3}],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 4, end: 6 }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }
}