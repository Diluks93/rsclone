export enum PageId {
  MainPage = 'main-page',
  HomePage = 'home-page',
  SettingsPage = 'settings-page',
  AuthorsPage = 'authors-page',
  ErrorPage = 'error-page',
  CurrentPage = 'current-page',
  LevelSelectPage = 'levels-page',
}

export enum ErrorType {
  Error_404 = '404',
}

export enum StorageKey {
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

export enum FrameKey {
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
export enum AnimationKey {
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

export enum AssetUrl {
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
  RsSchoolLogo = 'rs-school.png',
  Level0 = 'level/level-0.png',
  Level1 = 'level/level-1.png',
  Level2 = 'level/level-2.png',
  LevelExample = 'level/level-example.png',
}

export enum EventName {
  IncreaseScore = 'increasescore',
  GoThroughDoor = 'fake-door',
}

export enum GameKey {
  Floor = 'platforms',
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

export enum SceneKey {
  Interface = 'ui-scene',
  Preload = 'preload-scene',
  Tutorial = 'tutorial-scene',
  Onwards = 'onwards',
  FirstSteps = 'first-steps',
  Manager = 'manager-scene',
  Endgame = 'endgame-scene',
}

export enum ScoreOperations {
  Increase,
  Decrease,
  SetValue,
}

export enum GameStatus {
  Win,
  Lose,
}

export enum Event {
  Endgame = 'endgame',
  AddItem = 'additem',
  RemoveItem = 'removeitem',
}

export enum LevelName {
  FirstSteps,
  Onwards,
  HereWeGo,
  TheFirstTrick,
  TvAfternoon,
  BirthdaySurprises,
}

export enum MaxScore {
  FirstSteps = 75,
  Onwards = 100,
  HereWeGo = 150,
  TheFirstTrick = 200,
  TvAfternoon = 200,
  BirthdaySurprises = 200,
}

export enum GameFont {
  LargeSize = '32px',
  MediumSize = '24px',
  SmallSize = '16px',
  PressStartFamily = 'PressStart2P',
  OpenSansFamily = 'OpenSans',
  TransparentBlackColor = 'rgba(0,0,0,0.5)',
  WhiteColor = '#fff',
  CenterAlign = 'center',
  RightAlign = 'right',
}

export enum NavigationButtonsId {
  PlayLevelButton = 'play-level-button',
  ExitTheGame = 'exit-level',
}

export enum FirstFloorRoom {
  LeftSide = 1000,
  RightSide = 2700,
  Center = 1850,
  Ceil = 1000,
}

export enum ProgressBoxSize {
  OuterWidth = 320,
  OuterHeight = 50,
  InnerWidth = 300,
  InnerHeight = 30,
  Center = 0.5,
}

export enum LayerName {
  Park = '__park',
  Hero = '__hero',
}

export enum IconId {
  ChevronUp = 'chevron-up',
  ArrowLeft = 'arrow-left',
  Check = 'check',
  Clock = 'clock',
  Github = 'github',
  Link = 'link',
  Music = 'music',
  Play = 'play',
  Star = 'star',
  Volume = 'volume',
  Wink = 'wink',
}
