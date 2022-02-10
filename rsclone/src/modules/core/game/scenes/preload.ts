import { settingsStore } from './../../stores/settingsStore';
import director from '../../../../assets/game/director.png';
import pen from '../../../../assets/game/pen.png';
import fakeDoor from '../../../../assets/game/fake-door.png';
import trickedPicture from '../../../../assets/game/picture-2.png';
import picture from '../../../../assets/game/picture-1.png';
import gameTranslation from '../../data/gameTranslation.json';

import { GameKey, UrlSourceForGame, SceneKey, GameFont } from '../../enums/enums';

const ORIGIN_CENTER = 0.5;
const PROGRESS_BOX_WIDTH = 320;
const PROGRESS_BOX_HEIGHT = 50;

export default class PreloadScene extends Phaser.Scene {
  cameraCenterX = 0;

  cameraCenterY = 0;

  constructor() {
    super({ key: SceneKey.PreloadScene });
  }

  preload(): void {
    this.cameraCenterX = this.cameras.main.width / 2;
    this.cameraCenterY = this.cameras.main.height / 2;
    const progressBox = this.createProgressBox();
    const progressBar = this.add.graphics();

    const loadingText = this.make.text({
      x: this.cameraCenterX,
      y: this.cameraCenterY - PROGRESS_BOX_HEIGHT,
      text: gameTranslation[settingsStore.languageValue].preloaderText,
      style: {
        fontFamily: 'Open sans',
        fontSize: GameFont.MediumSize,
      },
    });
    loadingText.setOrigin(ORIGIN_CENTER);

    const persentText = this.make.text({
      x: this.cameraCenterX,
      y: this.cameraCenterY,
      text: '0%',
      style: {
        fontFamily: GameFont.OpenSansFamily,
        fontSize: GameFont.SmallSize,
      },
    });
    persentText.setOrigin(ORIGIN_CENTER);

    const assetText = this.make.text({
      x: this.cameraCenterX,
      y: this.cameraCenterY + PROGRESS_BOX_HEIGHT,
      text: '',
      style: {
        fontFamily: GameFont.PressStartFamily,
        fontSize: GameFont.SmallSize,
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
      assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      progressBox.destroy();
      progressBar.destroy();
      persentText.destroy();
      assetText.destroy();
      this.scene.start(SceneKey.ManagerScene);
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
    this.load.setBaseURL(UrlSourceForGame.Main);
    this.load.image(GameKey.Assets, UrlSourceForGame.Tileset);
    this.load.tilemapTiledJSON(GameKey.Map, UrlSourceForGame.TilemapJson);
    this.load.spritesheet(GameKey.Player, UrlSourceForGame.Player, { frameWidth: 190, frameHeight: 257 });
    this.load.spritesheet(GameKey.Neighbor, UrlSourceForGame.Neighbor, { frameWidth: 190, frameHeight: 257 });
    this.load.audio(GameKey.MusicGame, UrlSourceForGame.MusicGame);
    this.load.audio(GameKey.SoundFootsteps, UrlSourceForGame.SoundFootsteps);
    this.load.audio(GameKey.SoundTrick, UrlSourceForGame.SoundTrick);
    this.load.image(GameKey.Director, director);
    this.load.image(GameKey.Pen, pen);
    this.load.image(GameKey.FakeDoor, fakeDoor);
    this.load.image(GameKey.Picture, picture);
    this.load.image(GameKey.TrickedPicture, trickedPicture);
  }
}
