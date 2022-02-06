import Page from '../templates/Page';

type TitleType = {
  pageName: string;
  tagName: string;
  id: string;
  text?: string;
  imageUrl?: string;
};

type LinkButtonType = {
  className?: string;
  pageName?: string;
  id: string;
  href: string;
  subTitle?: string;
  iconId?: string;
};

type SettingsCheckboxType = {
  text: string;
  id: string;
  isEnabled: boolean;
  clickHandler(): void;
};

type SettingsRangeType = {
  iconUrl: string;
  id: string;
  min: string;
  max: string;
  step: string;
  value: string;
  inputHandler(e: Event): void;
};

type SettingsSelectType = {
  id: string;
  options: LanguageKeys[];
  changeHandler(e: Event, page: Page): void;
};

type SettingsConfigType = {
  languageValue: LanguageKeys;
  volumeValue: string;
  isSoundEnabled: boolean;
  isTimeLimitEnabled: boolean;
  isTricksReportEnabled: boolean;
};

type LanguageKeys = 'ru' | 'en';

type ButtonAuthorsOrNames = {
  text: string;
  url?: string;
  id?: string;
}[];

type DescriptionType = {
  timeLimitId: string;
  ratingCountId: string;
  hintId: string;
  levelDescriptionId: string;
};

interface LinkButtonInterface {
  startGameButton: LinkButtonType;
  openSettingsButton: LinkButtonType;
  openAuthorsButton: LinkButtonType;
}

interface AuthorButtonInterface {
  diluksAuthorButton: LinkButtonType;
  jenyaAuthorButton: LinkButtonType;
  randomspellsAuthorButton: LinkButtonType;
}

interface GameTranslationInterface {
  ru: GameTranslationType;
  en: GameTranslationType;
}

type GameTranslationType = {
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
  isSoundEnabledLabel: string;
  isTimeLimitEnabledLabel: string;
  saveSettingsButton: string;
  diluksSubtitle: string;
  jenyaSubtitle: string;
  randomspellsSubtitle: string;
  levelDetailsBlock: Array<LevelDetailsType>;
  tutorialSpeech: string[];
  tutorialHint: string;
  exitWarning: string;
};

type LevelDetailsType = {
  levelTitle: string;
  hintText: string;
  levelDescriptionText: string;
  timeLimit: string;
};

type LevelPreviewType = {
  id: string;
  imageUrl: string;
  isLocked: boolean;
};

type ScreenResolutionType = {
  minHeight: number;
  minWidth: number;
};

type TargetItemConfigType = {
  x: number;
  y: number;
  originalItemKey: string;
  trickedItemKey: string;
  actionItemKey: string;
};

export {
  SettingsCheckboxType,
  SettingsRangeType,
  LinkButtonType,
  SettingsSelectType,
  SettingsConfigType,
  LanguageKeys,
  ButtonAuthorsOrNames,
  TitleType,
  DescriptionType,
  LinkButtonInterface,
  GameTranslationInterface,
  AuthorButtonInterface,
  LevelPreviewType,
  ScreenResolutionType,
  TargetItemConfigType,
};
