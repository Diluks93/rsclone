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
  BackgroundMusicVolume = 'BackgroundMusicVolume',
  SoundCheckbox = 'soundCheckbox',
  TimeLimitCheckbox = 'timeLimitCheckbox',
  IsFullScreenModalShown = 'isFullScreenModalShown',
  CurrentLevel = 'currentLevel',
  PlayerScore = 'playerScore',
}

export const enum FrameKey {
  WoodyBackStart,
  WoodyBackMiddle,
  WoodyBackEnd,
  WoodySideStart,
  WoodySideMiddle,
  WoodySideEnd,
  WoodyFrontStart,
  WoodyFrontMiddle,
  WoodyFrontEnd,
  WoodyActionStart,
  WoodyActionMiddle,
  WoodyActionEnd,
  WoodyPick,
  WoodyAware,
  NeighborBackStart,
  NeighborBackMiddle,
  NeighborBackEnd,
  NeighborSideStart,
  NeighborSideMiddle,
  NeighborSideEnd,
  NeighborFrontStart,
  NeighborFrontMiddle,
  NeighborFrontEnd,
  NeighborAngerStart,
  NeighborAngerEnd,
}
export const enum AnimationKey {
  WoodyIdle = 'woody-idle',
  WoodyUp = 'woody-up',
  WoodySide = 'woody-side',
  WoodyDown = 'woody-down',
  WoodyPick = 'woody-pick',
  WoodyAware = 'woody-aware',
  WoodyAction = 'woody-action',
  NeighborIdle = 'neighbor-idle',
  NeighborUp = 'neighbor-up',
  NeighborSide = 'neighbor-side',
  NeighborDown = 'neighbor-down',
  NeighborAnger = 'neighbor-anger',
}

export const enum AssetUrl {
  Main = 'https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source',
  Tileset = 'game/map/assets.png',
  TilemapJson = 'game/map/map.json',
  Actors = 'game/actors-sprite.png',
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
  Player = 'player',
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
  Interface = 'ui-scene',
  Preload = 'preload-scene',
  Tutorial = 'tutorial-scene',
  Onwards = 'onwards',
  FirstSteps = 'first-steps',
  Manager = 'manager-scene',
  Endgame = 'endgame-scene',
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
  Endgame = 'endgame',
  AddItem = 'additem',
  RemoveItem = 'removeitem',
}

export const enum LevelName {
  FirstSteps,
  Onwards,
  HereWeGo,
}

export const enum MaxScore {
  FirstSteps = 75,
  Onwards = 100,
  HereWeGo = 150,
}

export const enum GameFont {
  LargeSize = '32px',
  MediumSize = '24px',
  SmallSize = '16px',
  PressStartFamily = 'PressStart2P',
  OpenSansFamily = 'Open sans',
  TransparentBlackColor = 'rgba(0,0,0,0.5)',
  WhiteColor = '#fff',
  CenterAlign = 'center',
  RightAlign = 'right',
}
