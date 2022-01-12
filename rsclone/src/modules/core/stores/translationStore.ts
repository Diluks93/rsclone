import { StorageKeys } from '../interfaces/enums';
import { jsonUrl } from './../data/jsonUrls';
import { saveTranslationToStorage } from '../utils/utils';

for (const storageKey of Object.values(StorageKeys)) {
  saveTranslationToStorage(storageKey, jsonUrl[storageKey]);
}

type TranslationInterface = {
  [key in StorageKeys]?: TranslationType;
};

type LanguageKeys = 'ru' | 'en';

type TranslationType = {
  [K in LanguageKeys]: {
    [key: string]: string;
  };
};

class TranslationStore {
  translation: TranslationInterface;

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

  get homeTranslation() {
    return this.translation.homeTranslation;
  }

  get categoriesTranslation() {
    return this.translation.categoriesTranslation;
  }

  get episodesTranslation() {
    return this.translation.episodesTranslation;
  }

  get settingsTranslation() {
    return this.translation.settingsTranslation;
  }
}

export const translationStore = new TranslationStore();
