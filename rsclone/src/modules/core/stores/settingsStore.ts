import { LevelName, MaxScore, StorageKey } from '../enums/enums';
import { LanguageKeys, SettingsConfigType } from './../types/types';

const defaultConfig: SettingsConfigType = {
  languageValue: 'ru',
  isSoundEnabled: true,
  isTimeLimitEnabled: false,
  isTricksReportEnabled: false,
  currentLevel: 0,
};

class SettingsStore {
  private _languageValue: LanguageKeys;

  private _isSoundEnabled: boolean;

  private _isTimeLimitEnabled: boolean;

  private _isTricksReportEnabled: boolean;

  private _windowWidth: number;

  private _windowHeight: number;

  private _currentLevel: number;

  public playerScore: Record<string, number>;

  public maxScore: Record<string, number> = {
    [LevelName.FirstSteps]: MaxScore.FirstSteps,
    [LevelName.Onwards]: MaxScore.Onwards,
    [LevelName.HereWeGo]: MaxScore.HereWeGo,
  };

  constructor({
    languageValue,
    isSoundEnabled,
    isTimeLimitEnabled,
    isTricksReportEnabled,
    currentLevel,
  }: SettingsConfigType) {
    this.playerScore = JSON.parse(localStorage.getItem(StorageKey.PlayerScore) as string) || {};
    this._currentLevel = JSON.parse(localStorage.getItem(StorageKey.CurrentLevel) as string) || currentLevel;
    this._languageValue = (localStorage.getItem(StorageKey.LanguageValue) as LanguageKeys) || languageValue;
    if (JSON.parse(localStorage.getItem(StorageKey.SoundCheckbox) as string) === null) {
      this._isSoundEnabled = isSoundEnabled;
    } else {
      this._isSoundEnabled = JSON.parse(localStorage.getItem(StorageKey.SoundCheckbox) as string);
    }
    this._isTimeLimitEnabled =
      JSON.parse(localStorage.getItem(StorageKey.TimeLimitCheckbox) as string) || isTimeLimitEnabled;
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

  get currentLevel(): number {
    return this._currentLevel;
  }

  set currentLevel(value: number) {
    localStorage.setItem(StorageKey.CurrentLevel, JSON.stringify(value));
    this._currentLevel = value;
  }

  get languageValue(): LanguageKeys {
    return this._languageValue;
  }

  set languageValue(value: LanguageKeys) {
    this._languageValue = value;
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

  savePlayerScore(level: number, score: number) {
    this.playerScore[level] = score;
    localStorage.setItem(StorageKey.PlayerScore, JSON.stringify(this.playerScore));
  }
}

export const settingsStore = new SettingsStore(defaultConfig);
