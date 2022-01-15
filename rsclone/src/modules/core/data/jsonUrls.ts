import { StorageKeys } from '../enums/enums';

export const jsonUrl: Record<string, string> = {
  [StorageKeys.HomeTranslation]:
    'https://raw.githubusercontent.com/Diluks93/source-rsclone/new-files/rsclone-source/json/home.json',
  [StorageKeys.CategoriesTranslation]:
    'https://raw.githubusercontent.com/Diluks93/source-rsclone/new-files/rsclone-source/json/categories.json',
  [StorageKeys.EpisodesTranslation]:
    'https://raw.githubusercontent.com/Diluks93/source-rsclone/new-files/rsclone-source/json/episodes.json',
  [StorageKeys.SettingsTranslation]:
    'https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source/json/settings.json',
};
