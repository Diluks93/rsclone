import { settingsStore } from './../stores/settingsStore';
import { LinkButtonType } from '../types/types';
import gameTranslation from '../data/gameTranslation.json';
import { PageIds } from '../enums/enums';

export const backBtnProps: LinkButtonType = {
  text: gameTranslation[settingsStore.languageValue].backToMainBtn,
  className: 'back-btn',
  id: 'backToMainBtn',
  href: `#${PageIds.HomePage}`,
};
