import Page from '../templates/Page';
import gameTranslation from '../data/gameTranslation.json';

import { PageId, StorageKey } from '../enums/enums';
import { settingsStore } from './../../core/stores/settingsStore';
import { adjustVolume, turnOnBackgroundMusic } from '../utils/utils';
import { backgroundMusic } from './constAudio';
import {
  SettingsCheckboxType,
  SettingsRangeType,
  LinkButtonType,
  SettingsSelectType,
  LanguageKeys,
  TitleType,
  GameTranslationInterface,
} from './../types/types';

export const TEXT_NODE = 3;

const PAGE_NAME = PageId.SettingsPage;
export const settingsTitleProps: TitleType = {
  pageName: PAGE_NAME,
  id: 'settingsTitle',
  tagName: 'h1',
};

export const selectProps: SettingsSelectType = {
  id: 'lang-select',
  options: ['ru', 'en'],
  iconId: 'chevron-up',
  changeHandler(e: Event, page: Page): void {
    if (e.target instanceof HTMLInputElement) {
      settingsStore.languageValue = e.target.value as LanguageKeys;
      localStorage.setItem(StorageKey.LanguageValue, e.target.value);
      page.setPageLanguage(gameTranslation as GameTranslationInterface, settingsStore.languageValue);
    }
  },
};

export const rangeProps: SettingsRangeType = {
  iconUrl: '../../../assets/svg/volume.svg',
  id: 'volumeBar',
  min: '0',
  max: '1',
  step: '0.1',
  value: settingsStore.volumeValueMenu,
  inputHandler(e: Event): void {
    if (e.target instanceof HTMLInputElement) {
      settingsStore.volumeValueMenu = e.target.value;
      adjustVolume(backgroundMusic, +e.target.value);
      localStorage.setItem(StorageKey.SoundVolumeMenu, e.target.value);

      e.target.style.backgroundImage = `
          -webkit-gradient(linear, left top, right top,
          color-stop(${e.target.value}, #ff6633),
          color-stop(${e.target.value}, #fff))
        `;
    }
  },
};

export const volumeBarId = {
  volumeBarMainPage: 'volumeBarMainPage',
  volumeBarGame: 'volumeBarGame',
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
