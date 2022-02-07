import { PageId, StorageKey } from '../enums/enums';
import gameTranslation from '../data/gameTranslation.json';
import {
  SettingsCheckboxType,
  SettingsRangeType,
  LinkButtonType,
  SettingsSelectType,
  LanguageKeys,
  TitleType,
} from './../types/types';
import { settingsStore } from './../../core/stores/settingsStore';
import Page from '../templates/Page';
import { adjustVolume, turnOnBackgroundMusic } from '../utils/utils';
import { backgroundMusic } from './constAudio';

export const TEXT_NODE = 3;
const PAGE_NAME = 'settings-page';

export const settingsTitleProps: TitleType = {
  pageName: PAGE_NAME,
  id: 'settingsTitle',
  tagName: 'h1',
};

export const selectProps: SettingsSelectType = {
  id: 'lang-select',
  options: ['ru', 'en'],
  changeHandler(e: Event, page: Page): void {
    if (e.target instanceof HTMLSelectElement) {
      settingsStore.languageValue = e.target.value as LanguageKeys;
      localStorage.setItem(StorageKey.LanguageValue, e.target.value);
      page.setPageLanguage(gameTranslation, settingsStore.languageValue);
    }
  },
};

export const rangeProps: SettingsRangeType = {
  iconUrl: '../../../assets/svg/volume.svg',
  id: 'volumeBar',
  min: '0',
  max: '1',
  step: '0.1',
  value: settingsStore.volumeValue,
  inputHandler(e: Event): void {
    if (e.target instanceof HTMLInputElement) {
      settingsStore.volumeValue = e.target.value;
      adjustVolume(backgroundMusic, +e.target.value);
      localStorage.setItem(StorageKey.SoundVolume, e.target.value);

      e.target.style.backgroundImage = `
          -webkit-gradient(linear, left top, right top,
          color-stop(${e.target.value}, #ff6633),
          color-stop(${e.target.value}, #fff))
        `;
    }
  },
};

export const checkboxProps: Record<string, SettingsCheckboxType> = {
  soundCheckbox: {
    text: 'SN',
    id: 'isSoundEnabledLabel',
    isEnabled: settingsStore.isSoundEnabled,
    clickHandler(): void {
      settingsStore.isSoundEnabled = !settingsStore.isSoundEnabled;
      localStorage.setItem(StorageKey.SoundCheckbox, JSON.stringify(settingsStore.isSoundEnabled));
      turnOnBackgroundMusic(backgroundMusic);
    },
  },

  timeLimitCheckbox: {
    text: 'T',
    id: 'isTimeLimitEnabledLabel',
    isEnabled: settingsStore.isTimeLimitEnabled,
    clickHandler(): void {
      settingsStore.isTimeLimitEnabled = !settingsStore.isTimeLimitEnabled;
      localStorage.setItem(StorageKey.TimeLimitCheckbox, JSON.stringify(settingsStore.isTimeLimitEnabled));
    },
  },
};

export const settingsLinkButtonProps: Record<string, LinkButtonType> = {
  saveButton: {
    pageName: PAGE_NAME,
    id: 'saveSettingsButton',
    href: `#${PageId.HomePage}`,
    iconId: 'check',
  },
};
