import { LanguageKeys } from './../stores/translationStore';
import { PageIds, SettingsTranslationKeys } from '../interfaces/enums';
import {
  SettingsCheckboxType,
  SettingsButtonType,
  SettingsRangeType,
  SettingsLinkButtonType,
  SettingsSelectType,
} from './../types/settingsTypes';
import { settingsStore } from './../../core/stores/settingsStore';

export const selectProps: SettingsSelectType = {
  id: 'lang-select',
  options: ['ru', 'en'],
  changeHandler(e: Event): void {
    if (e.target instanceof HTMLSelectElement) {
      settingsStore.languageValue = e.target.value as LanguageKeys;
      settingsStore.setSettingsLanguage();
      console.log(settingsStore);
    }
  },
};

export const rangesProps: SettingsRangeType[] = [
  {
    iconUrl:
      'https://raw.githubusercontent.com/randomspells/source-rsclone/af3870fdc4d1d92e27d7603277d7c09b9710b449/rsclone-source/settings-page/svg/sound.svg',
    id: 'volume-bar',
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
          color-stop(${target.value}, #4CD235), 
          color-stop(${target.value}, #E9F110))
        `;
      }
    },
  },
];

export const checkboxesProps: SettingsCheckboxType[] = [
  {
    text: 'Sound',
    id: SettingsTranslationKeys.Sound,
    isEnabled: settingsStore.isSoundEnabled,
    clickHandler(): void {
      settingsStore.isSoundEnabled = !settingsStore.isSoundEnabled;
    },
  },
  {
    text: 'Time Limit',
    id: SettingsTranslationKeys.TimeLimit,
    isEnabled: settingsStore.isTimeLimitEnabled,
    clickHandler(): void {
      settingsStore.isTimeLimitEnabled = !settingsStore.isTimeLimitEnabled;
    },
  },
  {
    text: 'Report',
    id: SettingsTranslationKeys.TricksReport,
    isEnabled: settingsStore.isTricksReportEnabled,
    clickHandler(): void {
      settingsStore.isTricksReportEnabled = !settingsStore.isTricksReportEnabled;
    },
  },
];

export const buttonsProps: SettingsButtonType[] = [
  {
    text: 'Reset',
    id: SettingsTranslationKeys.Reset,
  },
];

export const linkButtonsProps: SettingsLinkButtonType[] = [
  {
    text: 'Cancel',
    id: SettingsTranslationKeys.Cancel,
    href: `/#${PageIds.HomePage}`,
  },
  {
    text: 'Save',
    id: SettingsTranslationKeys.Save,
    href: `/#${PageIds.HomePage}`,
  },
];
