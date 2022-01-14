import { StorageKeys } from '../interfaces/enums';
import { jsonUrl } from './../data/jsonUrls';
import { saveFetchedJsonToStorage } from '../utils/utils';

for (const storageKey of Object.values(StorageKeys)) {
  saveFetchedJsonToStorage(storageKey, jsonUrl[storageKey]);
}

type TranslationStoreType = {
  [key in StorageKeys]?: TranslationPageType;
};

export type LanguageKeys = 'ru' | 'en';

type TranslationPageType = {
  [K in LanguageKeys]: {
    [key: string]: string;
  };
};

class TranslationStore {
  translation: TranslationStoreType;

  language: LanguageKeys;

  constructor() {
    this.translation = {};
    this.language = 'ru';
    this.parseTranslationFromStorage();
  }

  private parseTranslationFromStorage(): void {
    for (const storageKey of Object.values(StorageKeys)) {
      const itemFromStorageByKey = localStorage.getItem(storageKey);
      if (itemFromStorageByKey) {
        this.translation[storageKey] = JSON.parse(itemFromStorageByKey);
      }
    }
  }

  set currentLanguage(language: LanguageKeys) {
    this.language = language;
  }

  get homeTranslation(): TranslationPageType | undefined {
    return this.translation.homeTranslation;
  }

  get categoriesTranslation(): TranslationPageType | undefined {
    return this.translation.categoriesTranslation;
  }

  get episodesTranslation(): TranslationPageType | undefined {
    return this.translation.episodesTranslation;
  }

  get settingsTranslation(): TranslationPageType | undefined {
    return this.translation.settingsTranslation;
  }
}

export const translationStore = new TranslationStore();
