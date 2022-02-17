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
  BackgroundMusicVolume = 'backgroundMusicVolume',
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
  SoundPlayerDelighted = 'audio/player-delighted.mp3',
  SoundPlayerFright = 'audio/fright-player.mp3',
  SoundDoorOpen = 'audio/door-open.mp3',
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
  SoundPlayerDelighted = 'sound-delighted',
  SoundPlayerFright = 'sound-flight',
  SoundDoorOpen = 'door-open',
  Tileset = 'tileset',
}

export enum GameImageKey {
  FakeDoor = 'fake-door',
  Director = 'director',
  Pen = 'pen',
  PictureBefore = 'picture-before',
  PictureAfter = 'picture-after',
  CarpetBefore = 'carpet-before',
  CarpetAfter = 'carpet-after',
  Closet = 'closet',
  ClosetOpened = 'closet-opened',
  Dog = 'dog',
  Marbles = 'marbles',
  Plant = 'plant',
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
  TheFirstTrick,
  TvAfternoon,
  BirthdaySurprises,
}

export const enum MaxScore {
  FirstSteps = 75,
  Onwards = 100,
  HereWeGo = 150,
  TheFirstTrick = 200,
  TvAfternoon = 200,
  BirthdaySurprises = 200,
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

export const enum NavigationButtonsId {
  PlayLevelButton = 'play-level-button',
  ExitTheGame = 'exit-level',
}
