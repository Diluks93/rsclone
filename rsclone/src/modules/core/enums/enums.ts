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
  'rearViewStart',
  'rearView',
  'rearViewEnd',
  'rightViewStart',
  'rightView',
  'rightViewEnd',
  'frontViewStart',
  'frontView',
  'frontViewEnd',
  'leftViewStart',
  'leftView',
  'leftViewEnd',
};

const enum Urls {
  'main' = 'https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source',
  'assets' = 'game/map/assets.png',
  'map' = 'game/map/map.json',
  'voody' = 'game/voody.png',
};

const enum GameKeys {
  'DUDE_KEY' = 'dude',
  'ASSETS' = 'assets',
  'MAP' = 'map',
}

export { PageIds, ErrorTypes, StorageKeys, Frames, Urls, GameKeys };
