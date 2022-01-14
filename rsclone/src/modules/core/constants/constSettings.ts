import { translationStore } from './../stores/translationStore';
import { PageIds } from '../interfaces/enums';
import {
  SettingsCheckboxType,
  SettingsButtonType,
  SettingsRangeType,
  SettingsLinkButtonType,
  SettingsSelectType,
} from './../types/settingsTypes';

const settingsTranslation = translationStore.settingsTranslation || null;
const PLACEHOLDER = 'Lorem';
const LANG = translationStore.language;

export const selectProps: SettingsSelectType = {
  id: 'lang-select',
  options: ['ru', 'en'],
};

export const rangesProps: SettingsRangeType[] = [
  {
    iconUrl:
      'https://raw.githubusercontent.com/randomspells/source-rsclone/af3870fdc4d1d92e27d7603277d7c09b9710b449/rsclone-source/settings-page/svg/sound.svg',
    id: 'volume-bar',
    min: '0',
    max: '1',
    step: '0.1',
    value: '0.5',
  },
];

export const checkboxesProps: SettingsCheckboxType[] = [
  {
    text: settingsTranslation ? settingsTranslation[LANG].sound : PLACEHOLDER,
    id: 'toggle-sound',
  },
  {
    text: settingsTranslation ? settingsTranslation[LANG].timeLimit : PLACEHOLDER,
    id: 'toggle-time',
  },
  {
    text: settingsTranslation ? settingsTranslation[LANG].tricksReport : PLACEHOLDER,
    id: 'toggle-report',
  },
];

export const buttonsProps: SettingsButtonType[] = [
  {
    text: settingsTranslation ? settingsTranslation[LANG].resetProgress : PLACEHOLDER,
    id: 'reset-progress',
  },
];

export const linkButtonsProps: SettingsLinkButtonType[] = [
  {
    text: settingsTranslation ? settingsTranslation[LANG].cancel : PLACEHOLDER,
    id: 'cancel-settings',
    href: `/#${PageIds.HomePage}`,
  },
  {
    text: settingsTranslation ? settingsTranslation[LANG].save : PLACEHOLDER,
    id: 'save-settings',
    href: `/#${PageIds.HomePage}`,
  },
];
