import { LinkButtonInterface, TitleType } from './../types/types';
import { PageIds } from '../enums/enums';

const PAGE_NAME = 'home-page';

export const homeTitleProps: TitleType = {
  pageName: 'home-page',
  id: 'gameTitle',
  tagName: 'div',
};

export const homeLinkButtonProps: LinkButtonInterface = {
  startGameButton: {
    pageName: PAGE_NAME,
    id: 'startGameButton',
    href: `#${PageIds.LevelSelectPage}`,
  },
  openSettingsButton: {
    pageName: PAGE_NAME,
    id: 'openSettingsButton',
    href: `#${PageIds.SettingsPage}`,
  },
  openAuthorsButton: {
    pageName: PAGE_NAME,
    id: 'openAuthorsButton',
    href: `#${PageIds.AuthorsPage}`,
  },
};
