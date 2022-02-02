import bricks from '../../../assets/game/bricks.jpg';
import director from '../../../assets/game/director.png';
import pen from '../../../assets/game/pen.png';
import { GameKeys, Urls } from '../enums/enums';

const ORIGIN_CENTER = 0.5;
const PROGRESS_BOX_WIDTH = 320;
const PROGRESS_BOX_HEIGHT = 50;

const loaderFontConfig = {
  sizeL: '20px',
  sizeM: '18px',
  family: '"Open Sans", sans-serif',
};

export default class PreloadScene extends Phaser.Scene {
  cameraCenterX = 0;

  cameraCenterY = 0;

  constructor() {
    super({ key: 'preload-scene' });
  }

  preload(): void {
    this.cameraCenterX = this.cameras.main.width / 2;
    this.cameraCenterY = this.cameras.main.height / 2;
    const progressBox = this.createProgressBox();
    const progressBar = this.add.graphics();

    const loadingText = this.make.text({
      x: this.cameraCenterX,
      y: this.cameraCenterY - PROGRESS_BOX_HEIGHT,
      text: 'Loading...',
      style: {
        fontFamily: loaderFontConfig.family,
        fontSize: loaderFontConfig.sizeL,
      },
    });
    loadingText.setOrigin(ORIGIN_CENTER);

    const persentText = this.make.text({
      x: this.cameraCenterX,
      y: this.cameraCenterY,
      text: '0%',
      style: {
        fontFamily: loaderFontConfig.family,
        fontSize: loaderFontConfig.sizeM,
      },
    });
    persentText.setOrigin(ORIGIN_CENTER);

    const assetText = this.make.text({
      x: this.cameraCenterX,
      y: this.cameraCenterY + PROGRESS_BOX_HEIGHT,
      text: '',
      style: {
        fontFamily: loaderFontConfig.family,
        fontSize: loaderFontConfig.sizeM,
      },
    });
    assetText.setOrigin(ORIGIN_CENTER);

    // every asset should be in here
    this.preloadAssets();

    this.load.on('progress', (value: number) => {
      this.fillProgressBar(progressBar, value);
      persentText.setText(Math.round(value * 100) + '%');
    });

    this.load.on('fileprogress', (file: Phaser.Loader.File) => {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', () => {
      progressBox.destroy();
      progressBar.destroy();
      persentText.destroy();
      assetText.destroy();
      this.scene.start('first-step');
    });
  }

  createProgressBox(): Phaser.GameObjects.Graphics {
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.4);
    progressBox.fillRect(
      this.cameraCenterX - PROGRESS_BOX_WIDTH / 2,
      this.cameraCenterY - PROGRESS_BOX_HEIGHT / 2,
      PROGRESS_BOX_WIDTH,
      PROGRESS_BOX_HEIGHT
    );
    return progressBox;
  }

  fillProgressBar(bar: Phaser.GameObjects.Graphics, value: number): void {
    const progressBarWidth = 300;
    const progressBarHeight = 30;
    bar.clear();
    bar.fillStyle(0xff6633);
    bar.fillRect(
      this.cameraCenterX - progressBarWidth / 2,
      this.cameraCenterY - progressBarHeight / 2,
      progressBarWidth * value,
      progressBarHeight
    );
  }

  preloadAssets(): void {
    this.load.setBaseURL(Urls.main);
    this.load.image(GameKeys.ASSETS, Urls.assets);
    this.load.tilemapTiledJSON(GameKeys.MAP, Urls.map);
    this.load.spritesheet(GameKeys.DUDE_KEY, Urls.voody, { frameWidth: 190, frameHeight: 257 });
    this.load.image(GameKeys.Bricks, bricks);
    this.load.image(GameKeys.Director, director);
    this.load.image(GameKeys.Pen, pen);
  }
}
