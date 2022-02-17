import { ProgressBoxSize } from './../../enums/enums';
import { settingsStore } from './../../stores/settingsStore';
import gameTranslation from '../../data/gameTranslation.json';
import { GameImageKey, GameKey, SceneKey, GameFont, AssetUrl } from '../../enums/enums';
import { importFilesFromFolder } from '../../utils/utils';

const gameImages = importFilesFromFolder(require.context('../../../../assets/game/', false, /\.(png|jpe?g|svg)$/));

export default class PreloadScene extends Phaser.Scene {
  cameraCenterX = 0;

  cameraCenterY = 0;

  constructor() {
    super({ key: SceneKey.Preload });
  }

  preload(): void {
    this.cameraCenterX = this.cameras.main.width / 2;
    this.cameraCenterY = this.cameras.main.height / 2;
    const progressBox = this.createProgressBox();
    const progressBar = this.add.graphics();

    const loadingText = this.make.text({
      x: this.cameraCenterX,
      y: this.cameraCenterY - ProgressBoxSize.OuterHeight,
      text: gameTranslation[settingsStore.languageValue].preloaderText,
      style: {
        fontFamily: GameFont.OpenSansFamily,
        fontSize: GameFont.MediumSize,
      },
    });
    loadingText.setOrigin(ProgressBoxSize.Center);

    const percentText = this.make.text({
      x: this.cameraCenterX,
      y: this.cameraCenterY,
      text: '0%',
      style: {
        fontFamily: GameFont.OpenSansFamily,
        fontSize: GameFont.SmallSize,
      },
    });
    percentText.setOrigin(ProgressBoxSize.Center);

    const assetText = this.make.text({
      x: this.cameraCenterX,
      y: this.cameraCenterY + ProgressBoxSize.OuterHeight,
      text: '',
      style: {
        fontFamily: GameFont.PressStartFamily,
        fontSize: GameFont.SmallSize,
      },
    });
    assetText.setOrigin(ProgressBoxSize.Center);

    // every asset should be in here
    this.preloadAssets();

    this.load.on('progress', (value: number) => {
      this.fillProgressBar(progressBar, value);
      percentText.setText(Math.round(value * 100) + '%');
    });

    this.load.on('fileprogress', (file: Phaser.Loader.File) => {
      assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      progressBox.destroy();
      progressBar.destroy();
      percentText.destroy();
      assetText.destroy();
      this.scene.start(SceneKey.Manager);
    });
  }

  createProgressBox(): Phaser.GameObjects.Graphics {
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.4);
    progressBox.fillRect(
      this.cameraCenterX - ProgressBoxSize.OuterWidth / 2,
      this.cameraCenterY - ProgressBoxSize.OuterHeight / 2,
      ProgressBoxSize.OuterWidth,
      ProgressBoxSize.OuterHeight
    );

    return progressBox;
  }

  fillProgressBar(bar: Phaser.GameObjects.Graphics, value: number): void {
    bar.clear();
    bar.fillStyle(0xff6633);
    bar.fillRect(
      this.cameraCenterX - ProgressBoxSize.InnerWidth / 2,
      this.cameraCenterY - ProgressBoxSize.InnerHeight / 2,
      ProgressBoxSize.InnerWidth * value,
      ProgressBoxSize.InnerHeight
    );
  }

  preloadAssets(): void {
    this.load.setBaseURL(AssetUrl.Main);
    this.load.image(GameKey.Assets, AssetUrl.Tileset);
    this.load.tilemapTiledJSON(GameKey.Map, AssetUrl.TilemapJson);
    this.load.spritesheet(GameKey.Player, AssetUrl.Actors, {
      frameWidth: 19,
      frameHeight: 27,
      startFrame: 0,
      endFrame: 13,
    });
    this.load.spritesheet(GameKey.Neighbor, AssetUrl.Actors, {
      frameWidth: 19,
      frameHeight: 27,
      startFrame: 14,
      endFrame: 24,
    });
    this.load.audio(GameKey.MusicGame, AssetUrl.MusicGame);
    this.load.audio(GameKey.SoundFootsteps, AssetUrl.SoundFootsteps);
    this.load.audio(GameKey.SoundTrick, AssetUrl.SoundTrick);
    this.load.audio(GameKey.SoundPlayerDelighted, AssetUrl.SoundPlayerDelighted);
    this.load.audio(GameKey.SoundPlayerFright, AssetUrl.SoundPlayerFright);
    this.load.audio(GameKey.SoundDoorOpen, AssetUrl.SoundDoorOpen);
    for (const imageKey of Object.values(GameImageKey)) {
      this.load.image(imageKey, gameImages[imageKey]);
    }
  }
}
