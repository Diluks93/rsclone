const enum PageIds {
  MainPage = 'main-page',
  HomePage = 'home-page',
  SettingsPage = 'settings-page',
  AuthorsPage = 'authors-page',
  ErrorPage = 'error-page',
  CurrentPage = 'current-page',
  CategoriesPage = 'categories-page'
};

const enum ErrorTypes {
  Error_404 = '404'
}

enum StorageKeys {
  HomeTranslation = 'homeTranslation',
  CategoriesTranslation = 'categoriesTranslation',
  EpisodesTranslation = 'episodesTranslation',
  SettingsTranslation = 'settingsTranslation',
}

enum SettingsTranslationKeys {
  Sound = 'isSoundEnabled',
  Reset = 'resetProgress',
  TimeLimit = 'isTimeLimitEnabled',
  TricksReport = 'isTricksReportEnabled',
  Cancel = 'cancelSettings',
  Save = 'saveSettings',
}

export { PageIds, ErrorTypes, StorageKeys, SettingsTranslationKeys };