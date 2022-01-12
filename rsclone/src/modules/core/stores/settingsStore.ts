import { jsonUrl } from './../data/jsonUrls';
import { SettingsTranslationKeys, StorageKeys } from '../enums/enums';
import { LanguageKeys, SettingsConfigType } from './../types/settingsTypes';

const TEXT_NODE = 3;

const defaultConfig: SettingsConfigType = {
  languageValue: 'ru',
  volumeValue: '0.5',
  isSoundEnabled: true,
  isTimeLimitEnabled: false,
  isTricksReportEnabled: false,
};

class SettingsStore {
  private _languageValue: LanguageKeys;

  private _volumeValue: string;

  private _isSoundEnabled: boolean;

  private _isTimeLimitEnabled: boolean;

  private _isTricksReportEnabled: boolean;

  constructor({
    languageValue,
    volumeValue,
    isSoundEnabled,
    isTimeLimitEnabled,
    isTricksReportEnabled,
  }: SettingsConfigType) {
    this._languageValue = languageValue;
    this._volumeValue = volumeValue;
    this._isSoundEnabled = isSoundEnabled;
    this._isTimeLimitEnabled = isTimeLimitEnabled;
    this._isTricksReportEnabled = isTricksReportEnabled;
  }

  get languageValue(): LanguageKeys {
    return this._languageValue;
  }

  set languageValue(value: LanguageKeys) {
    this._languageValue = value;
  }

  get volumeValue(): string {
    return this._volumeValue;
  }

  set volumeValue(value: string) {
    this._volumeValue = value;
  }

  get isSoundEnabled(): boolean {
    return this._isSoundEnabled;
  }

  set isSoundEnabled(value: boolean) {
    this._isSoundEnabled = value;
  }

  get isTimeLimitEnabled(): boolean {
    return this._isTimeLimitEnabled;
  }

  set isTimeLimitEnabled(value: boolean) {
    this._isTimeLimitEnabled = value;
  }

  get isTricksReportEnabled(): boolean {
    return this._isTricksReportEnabled;
  }

  set isTricksReportEnabled(value: boolean) {
    this._isTricksReportEnabled = value;
  }

  private async getSpecificPhrase(lang: LanguageKeys, key: string) {
    const data = await fetch(jsonUrl[StorageKeys.SettingsTranslation]);
    const json = await data.json();
    return json[lang][key];
  }

  setSettingsLanguage() {
    const language = this.languageValue;
    const translationKeys = Object.values(SettingsTranslationKeys);
    translationKeys.forEach((key) => {
      let element = document.getElementById(key);
      if (!(element instanceof HTMLInputElement)) {
        this.getSpecificPhrase(language, key).then((value) => {
          if (element !== null) {
            element.textContent = value;
          }
        });
      } else {
        element = element.parentElement;
        if (element === null) return;
        element.childNodes.forEach((node) => {
          if (node.nodeType === TEXT_NODE) {
            this.getSpecificPhrase(language, key).then((phrase) => {
              node.textContent = phrase;
            });
          }
        });
      }
    });
  }
}

export const settingsStore = new SettingsStore(defaultConfig);
