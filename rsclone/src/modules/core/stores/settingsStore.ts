import { LanguageKeys, SettingsConfigType } from './../types/types';

type TranslationType = {
  [K in LanguageKeys]: Record<string, string>;
};

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
    this._languageValue = (localStorage.getItem('languageValue') as LanguageKeys) || languageValue;
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

  setAppLanguage(translation: TranslationType) {
    const language = this.languageValue;
    console.log(language);
    const translationKeys = Object.keys(translation[language]);
    translationKeys.forEach((key) => {
      let element = document.getElementById(key);
      if (key !== 'gameTitle') {
        if (element === null) return;
        if (!(element instanceof HTMLInputElement) && element !== null) {
          element.textContent = translation[language][key];
        } else {
          element = element.parentElement;
          if (element === null) return;
          element.childNodes.forEach((node) => {
            if (node.nodeType === TEXT_NODE && element !== null) {
              node.textContent = translation[language][key];
            }
          });
        }
      } else {
        if (element === null) return;
        element.style.backgroundImage = `url(${translation[language][key]})`;
      }
    });
  }
}

export const settingsStore = new SettingsStore(defaultConfig);
