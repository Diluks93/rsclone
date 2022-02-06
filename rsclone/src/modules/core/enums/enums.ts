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
  TilemapJson = 'game/map/map.json',
  Player = 'game/voody.png',
  Neighbor = 'game/neighbor.png',
  MusicGame = 'audio/game.mp3',
  SoundFootsteps = 'audio/footsteps.mp3',
  SoundPrank = 'audio/prank.mp3',
}

const enum GameKey {
  Player = 'dude',
  Neighbor = 'neighbor',
  Assets = 'assets',
  Map = 'map',
  MusicGame = 'music-game',
  SoundFootsteps = 'sound-footsteps',
  SoundPrank = 'sound-prank',
  Tileset = 'tileset',
  Bricks = 'bricks',
  Director = 'director',
  Pen = 'pen',
  Fake = 'fake-door',
}

const enum ScoreOperations {
  Increase,
  Decrease,
  SetValue
}

const enum GameStatus {
  Win,
  Lose
}

const enum Event {
  GameEnd = 'game-end',
}

export { PageId, ErrorType, StorageKey, Frame, UrlSourceForGame, GameKey, ScoreOperations, GameStatus, Event };
