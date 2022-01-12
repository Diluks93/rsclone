import { translationStore } from './../stores/translationStore';
import { PageIds } from '../interfaces/enums';
import {
  SettingsCheckboxType,
  SettingsButtonType,
  SettingsRangeType,
  SettingsLinkButtonType,
} from './../types/settingsTypes';

const settingsTranslation = translationStore.settingsTranslation || null;
const PLACEHOLDER = 'Lorem ipsum';
const LANG = 'ru';

export const rangesProps: SettingsRangeType[] = [
  {
    iconUrl:
      'https://raw.githubusercontent.com/randomspells/source-rsclone/af3870fdc4d1d92e27d7603277d7c09b9710b449/rsclone-source/settings-page/svg/sound.svg',
    id: 'volume-bar',
    value: '60',
  },
];

export const checkboxesProps: SettingsCheckboxType[] = [
  {
    text: settingsTranslation ? settingsTranslation[LANG].music : PLACEHOLDER,
    id: 'toggle-sound',
  },
  {
    text: settingsTranslation ? settingsTranslation[LANG].timeLimit : PLACEHOLDER,
    id: 'toggle-time',
  },
  {
    text: settingsTranslation ? settingsTranslation[LANG].trickReport : PLACEHOLDER,
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
    text: settingsTranslation ? settingsTranslation[LANG].ok : PLACEHOLDER,
    id: 'save-settings',
    href: `/#${PageIds.HomePage}`,
  },
];
