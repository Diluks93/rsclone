import { LanguageKeys, SettingsConfigType } from './../types/types';

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

  private _windowWidth: number;

  private _windowHeight: number;

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
    this._windowWidth = window.innerWidth;
    this._windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      this._windowWidth = window.innerWidth;
      this._windowHeight = window.innerHeight;
    });
  }

  get windowWidth(): number {
    return this._windowWidth;
  }

  get windowHeight(): number {
    return this._windowHeight;
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
}

export const settingsStore = new SettingsStore(defaultConfig);
