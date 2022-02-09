const enum PageId {
  MainPage = 'main-page',
  HomePage = 'home-page',
  SettingsPage = 'settings-page',
  AuthorsPage = 'authors-page',
  ErrorPage = 'error-page',
  CurrentPage = 'current-page',
  LevelSelectPage = 'levels-page',
}

const enum ErrorType {
  Error_404 = '404',
}

const enum StorageKey {
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

const enum Frame {
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

const enum UrlSourceForGame {
  Main = 'https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source',
  Tileset = 'game/map/assets.png',
  TilemapJson = 'game/map/map-test.json',
  Player = 'game/voody.png',
  MusicGame = 'audio/game.mp3',
  SoundFootsteps = 'audio/footsteps.mp3',
  SoundPrank = 'audio/prank.mp3',
}

const enum GameKey {
  CanvasParent = 'first-step',
  Player = 'dude',
  Assets = 'assets',
  Map = 'map',
  MusicGame = 'music-game',
  SoundFootsteps = 'sound-footsteps',
  SoundPrank = 'sound-prank',
  Tileset = 'tileset',
  Bricks = 'bricks',
  Director = 'director',
  Pen = 'pen',
  Picture = 'picture',
  TrickedPicture = 'trickedPicture',
}

const enum SceneKey {
  InterfaceScene = 'ui-scene',
  PreloadScene = 'preload-scene',
  TutorialScene = 'tutorial-scene',
  FirstSteps = 'first-steps',
  ManagerScene = 'manager-scene',
}

const enum LevelNameEnum {
  FirstSteps,
  Onwards,
  HereWeGo,
}

export { PageId, ErrorType, StorageKey, Frame, UrlSourceForGame, GameKey, SceneKey, LevelNameEnum };
