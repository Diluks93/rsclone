const enum PageIds {
  MainPage = 'main-page',
  HomePage = 'home-page',
  SettingsPage = 'settings-page',
  AuthorsPage = 'authors-page',
  ErrorPage = 'error-page',
  CurrentPage = 'current-page',
  LevelSelectPage = 'levels-page',
}

const enum ErrorTypes {
  Error_404 = '404',
}

const enum StorageKeys {
  HomeTranslation = 'homeTranslation',
  CategoriesTranslation = 'categoriesTranslation',
  EpisodesTranslation = 'episodesTranslation',
  SettingsTranslation = 'settingsTranslation',
}

const enum Frames {
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

const enum UrlsSourcesForGame {
  Main = 'https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source',
  Tileset = 'game/map/assets.png',
  TilemapJson = 'game/map/map.json',
  Player = 'game/voody.png',
  MusicGame = 'audio/game.mp3',
  SoundFootsteps = 'audio/footsteps.mp3',
  SoundPrank = 'audio/prank.mp3',
}

const enum GameKeys {
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
}

export { PageIds, ErrorTypes, StorageKeys, Frames, UrlsSourcesForGame, GameKeys };
