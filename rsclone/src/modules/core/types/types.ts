import Page from '../templates/Page';

export type TitleType = {
  pageName: string;
  tagName: string;
  id: string;
  text?: string;
  imageUrl?: string;
};

export type LinkButtonType = {
  className?: string;
  pageName?: string;
  id: string;
  href: string;
  subTitle?: string;
  iconId?: string;
};

export type SettingsCheckboxType = {
  text: string;
  id: string;
  isEnabled: boolean;
  clickHandler(): void;
};

export type SettingsRangeType = {
  min: string;
  max: string;
  step: string;
  value: string;
  inputHandler(e: Event): void;
};

export type SettingsVolumeBarType = {
  volumeBarSound: string;
  volumeBarBackgroundMusic: string;
};

export type SettingsSelectType = {
  id: string;
  options: LanguageKeys[];
  iconId: string;
  changeHandler(e: Event, page: Page): void;
};

export type SettingsConfigType = {
  languageValue: LanguageKeys;
  isSoundEnabled: boolean;
  isTimeLimitEnabled: boolean;
  isTricksReportEnabled: boolean;
  currentLevel: number;
};

export type LanguageKeys = 'ru' | 'en';

export type ButtonAuthorsOrNames = {
  text: string;
  url?: string;
  id?: string;
}[];

export type DescriptionType = {
  timeLimitId: string;
  ratingCountId: string;
  hintId: string;
  levelDescriptionId: string;
};

export type TargetItemConfigType = {
  x: number;
  y: number;
  originalItemKey: string;
  trickedItemKey: string;
  actionItemKey: string;
};

export type GameTranslationType = {
  gameTitle: string;
  startGameButton: string;
  openSettingsButton: string;
  openAuthorsButton: string;
  tutorialTitle: string;
  seasonOneTitle: string;
  backToMainButton: string;
  playLevelButton: string;
  settingsTitle: string;
  authorsTitle: string;
  soundTitle: string;
  musicTitle: string;
  isSoundEnabledLabel: string;
  isTimeLimitEnabledLabel: string;
  saveSettingsButton: string;
  diluksSubtitle: string;
  jenyaSubtitle: string;
  randomspellsSubtitle: string;
  levelDetailsBlock: Array<LevelDetailsType>;
  tutorialSpeech: string[][];
  continueText: string;
  exitWarning: string;
  fullScreenWarningText: string;
  fullScreenActionText: string;
  preloaderText: string;
  scoreText: string;
  loseText: string;
  winText: string;
  spaceText: string;
  eKeyText: string;
  screenRangeErrorText: string;
};

export type LevelDetailsType = {
  levelTitle: string;
  hintText: string;
  levelDescriptionText: string;
  timeLimit: string;
};

export type LevelPreviewType = {
  id: number;
  imageUrl: string;
  isLocked: boolean;
};

export type ScreenResolutionType = {
  minHeight: number;
  minWidth: number;
};

export interface DoorWayInterface extends Phaser.GameObjects.Image {
  id: number;
  nextDoorWayId: number;
  isScored: boolean;
}

export interface LinkButtonInterface {
  startGameButton: LinkButtonType;
  openSettingsButton: LinkButtonType;
  openAuthorsButton: LinkButtonType;
}

export interface AuthorButtonInterface {
  diluksAuthorButton: LinkButtonType;
  jenyaAuthorButton: LinkButtonType;
  randomspellsAuthorButton: LinkButtonType;
}

export interface GameTranslationInterface {
  ru: GameTranslationType;
  en: GameTranslationType;
}

export interface LevelTitleInterface {
  tutorialTitle: TitleType;
  seasonOneTitle: TitleType;
  levelDetailsTitle: TitleType;
}

export interface LevelPreviewInterface {
  [key: string]: LevelPreviewType[];
}

export type PortraitType = {
  portraitBox: Phaser.GameObjects.Graphics;
  directorImage: Phaser.GameObjects.Image;
};

export type SceneDataType = {
  currentLevel: number;
  gameStatus: number;
  currentScene?: Phaser.Scene;
  currentScore?: number;
};

export type MapLayerType = {
  platforms: string;
  bg: string;
  bgWindow: string;
  bgDoors: string;
  object: {
    id: {
      [object: string]: string;
      things: string;
      neighbor: string;
    };
    name: {
      [spawnPlayer: string]: string;
      spawnPen: string;
      spawnPicture: string;
      spawnNeighbor: string;
    };
  };
};
