export const enum PageId {
  MainPage = 'main-page',
  HomePage = 'home-page',
  SettingsPage = 'settings-page',
  AuthorsPage = 'authors-page',
  ErrorPage = 'error-page',
  CurrentPage = 'current-page',
  LevelSelectPage = 'levels-page',
}

export const enum ErrorType {
  Error_404 = '404',
}

export const enum StorageKey {
  HomeTranslation = 'homeTranslation',
  CategoriesTranslation = 'categoriesTranslation',
  EpisodesTranslation = 'episodesTranslation',
  SettingsTranslation = 'settingsTranslation',
  LanguageValue = 'languageValue',
  SoundVolume = 'soundVolume',
  SoundCheckbox = 'soundCheckbox',
  TimeLimitCheckbox = 'timeLimitCheckbox',
  IsFullScreenModalShown = 'isFullScreenModalShown',
  CurrentLevel = 'currentLevel',
}

export const enum Frame {
  RearViewStart,
  RearView,
  RearViewEnd,
  RightViewStart,
  RightView,
  RightViewEnd,
  FrontViewStart,
  FrontView,
  FrontViewEnd,
  LeftViewStart,
  LeftView,
  LeftViewEnd,
}

export const enum UrlSourceForGame {
  Main = 'https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source',
  Tileset = 'game/map/assets.png',
  TilemapJson = 'game/map/map.json',
  Player = 'game/voody.png',
  Neighbor = 'game/neighbor.png',
  MusicGame = 'audio/game.mp3',
  SoundFootsteps = 'audio/footsteps.mp3',
  SoundTrick = 'audio/prank.mp3',
}

export const enum EventName {
  IncreaseScore = 'increasescore',
  GoThroughDoor = 'fake-door',
}

export const enum GameKey {
  CanvasParent = 'game',
  Player = 'dude',
  Neighbor = 'neighbor',
  Assets = 'assets',
  Map = 'map',
  MusicGame = 'music-game',
  SoundFootsteps = 'sound-footsteps',
  SoundTrick = 'sound-prank',
  Tileset = 'tileset',
  Bricks = 'bricks',
  Director = 'director',
  Pen = 'pen',
  FakeDoor = 'fake-door',
  Picture = 'picture',
  TrickedPicture = 'trickedPicture',
}

export const enum SceneKey {
  InterfaceScene = 'ui-scene',
  PreloadScene = 'preload-scene',
  TutorialScene = 'tutorial-scene',
  Onwards = 'forward',
  FirstSteps = 'first-steps',
  ManagerScene = 'manager-scene',
}

export const enum ScoreOperations {
  Increase,
  Decrease,
  SetValue,
}

export const enum GameStatus {
  Win,
  Lose,
}

export const enum Event {
  GameEnd = 'game-end',
}

export const enum LevelNameEnum {
  FirstSteps,
  Onwards,
  HereWeGo,
}

export const enum GameFontSize {
  LargeFont = '32px',
  MediumFont = '24px',
  SmallFont = '16px',
}
