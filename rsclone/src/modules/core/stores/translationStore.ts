import { StorageKeys } from '../interfaces/enums';
import { jsonUrl } from './../data/jsonUrls';
import { saveFetchedJsonToStorage } from '../utils/utils';

for (const storageKey of Object.values(StorageKeys)) {
  saveFetchedJsonToStorage(storageKey, jsonUrl[storageKey]);
}

type TranslationStoreType = {
  [key in StorageKeys]?: TranslationPageType;
};

type LanguageKeys = 'ru' | 'en';

type TranslationPageType = {
  [K in LanguageKeys]: {
    [key: string]: string;
  };
};

class TranslationStore {
  translation: TranslationStoreType;

  constructor() {
    this.translation = {};
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
