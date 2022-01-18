import { PageIds } from '../enums/enums';
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

const PAGE_NAME = 'settings-page';

export const settingsTitleProps: TitleType = {
  pageName: PAGE_NAME,
  text: gameTranslation[settingsStore.languageValue].settingsTitle,
  id: 'settingsTitle',
  tagName: 'h2',
};

export const selectProps: SettingsSelectType = {
  id: 'lang-select',
  options: ['ru', 'en'],
  changeHandler(e: Event): void {
    if (e.target instanceof HTMLSelectElement) {
      settingsStore.languageValue = e.target.value as LanguageKeys;
      localStorage.setItem('languageValue', e.target.value);
      settingsStore.setAppLanguage(gameTranslation);
    }
  },
};

export const rangesProps: SettingsRangeType[] = [
  {
    iconUrl: '../../../assets/svg/volume.svg',
    id: 'volumeBar',
    min: '0',
    max: '1',
    step: '0.1',
    value: settingsStore.volumeValue,
    inputHandler(e: Event): void {
      const target = e.target;
      if (target instanceof HTMLInputElement) {
        settingsStore.volumeValue = target.value;

        target.style.backgroundImage = `
          -webkit-gradient(linear, left top, right top, 
          color-stop(${target.value}, #ff6633), 
          color-stop(${target.value}, #fff))
        `;
      }
    },
  },
];

export const checkboxesProps: SettingsCheckboxType[] = [
  {
    text: gameTranslation[settingsStore.languageValue].isSoundEnabledLabel,
    id: 'isSoundEnabledLabel',
    isEnabled: settingsStore.isSoundEnabled,
    clickHandler(): void {
      settingsStore.isSoundEnabled = !settingsStore.isSoundEnabled;
    },
  },
  {
    text: gameTranslation[settingsStore.languageValue].isTimeLimitEnabledLabel,
    id: 'isTimeLimitEnabledLabel',
    isEnabled: settingsStore.isTimeLimitEnabled,
    clickHandler(): void {
      settingsStore.isTimeLimitEnabled = !settingsStore.isTimeLimitEnabled;
    },
  },
];

export const settingsLinkButtonsProps: LinkButtonType[] = [
  {
    pageName: PAGE_NAME,
    text: gameTranslation[settingsStore.languageValue].saveSettingsBtn,
    className: gameTranslation.en.saveSettingsBtn.toLowerCase(),
    id: 'saveSettingsBtn',
    href: `#${PageIds.HomePage}`,
  },
];
