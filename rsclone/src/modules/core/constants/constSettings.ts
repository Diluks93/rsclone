import { PageIds } from '../interfaces/enums';
import {
  SettingsCheckboxType,
  SettingsButtonType,
  SettingsRangeType,
  SettingsLinkButtonType,
} from './../types/settingsTypes';

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
    text: 'Вкл / откл звук',
    id: 'toggle-sound',
  },
  {
    text: 'Ограничение по времени',
    id: 'toggle-time',
  },
  {
    text: 'Отчет по пакостям',
    id: 'toggle-report',
  },
];

export const buttonsProps: SettingsButtonType[] = [
  {
    text: 'Удалить прогресс игры',
    id: 'reset-progress',
  },
];

export const linkButtonsProps: SettingsLinkButtonType[] = [
  {
    text: 'Отмена',
    id: 'cancel-settings',
    href: `/#${PageIds.HomePage}`,
  },
  {
    text: 'Ок',
    id: 'save-settings',
    href: `/#${PageIds.HomePage}`,
  },
];
