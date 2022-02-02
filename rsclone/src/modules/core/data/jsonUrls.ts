import { StorageKey } from '../enums/enums';

export const jsonUrl: Record<string, string> = {
  [StorageKey.HomeTranslation]:
    'https://raw.githubusercontent.com/Diluks93/source-rsclone/new-files/rsclone-source/json/home.json',
  [StorageKey.CategoriesTranslation]:
    'https://raw.githubusercontent.com/Diluks93/source-rsclone/new-files/rsclone-source/json/categories.json',
  [StorageKey.EpisodesTranslation]:
    'https://raw.githubusercontent.com/Diluks93/source-rsclone/new-files/rsclone-source/json/episodes.json',
  [StorageKey.SettingsTranslation]:
    'https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source/json/settings.json',
};
