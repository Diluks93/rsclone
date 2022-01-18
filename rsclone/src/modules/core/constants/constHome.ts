import { LinkButtonType } from './../types/types';
import { settingsStore } from './../stores/settingsStore';
import gameTranslation from '../data/gameTranslation.json';
import { TitleType } from './../types/types';
import { PageIds } from '../enums/enums';

const PAGE_NAME = 'home-page';

export const homeTitleProps: TitleType = {
  pageName: 'home-page',
  imageUrl: gameTranslation[settingsStore.languageValue].gameTitle,
  id: 'gameTitle',
  tagName: 'div',
};

export const homeLinkButtonsProps: LinkButtonType[] = [
  {
    pageName: PAGE_NAME,
    className: gameTranslation.en.startGameBtn.toLowerCase(),
    id: 'startGameBtn',
    text: gameTranslation[settingsStore.languageValue].startGameBtn,
    href: `#${PageIds.LevelsPage}`,
  },
  {
    pageName: PAGE_NAME,
    className: gameTranslation.en.openSettingsBtn.toLowerCase(),
    id: 'openSettingsBtn',
    text: gameTranslation[settingsStore.languageValue].openSettingsBtn,
    href: `#${PageIds.SettingsPage}`,
  },
  {
    pageName: PAGE_NAME,
    className: gameTranslation.en.openAuthorsBtn.toLowerCase(),
    id: 'openAuthorsBtn',
    text: gameTranslation[settingsStore.languageValue].openAuthorsBtn,
    href: `#${PageIds.AuthorsPage}`,
  },
];
