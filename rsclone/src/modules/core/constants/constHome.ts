import { LinkButtonInterface, ScreenResolutionType, TitleType } from './../types/types';
import { PageId } from '../enums/enums';

export const screenResolution: ScreenResolutionType = {
  minHeight: 600,
  minWidth: 1024,
};

export const homeTitleProps: TitleType = {
  pageName: 'home-page',
  id: 'gameTitle',
  tagName: 'div',
};

export const homeLinkButtonProps: LinkButtonInterface = {
  startGameButton: {
    pageName: PageId.HomePage,
    id: 'startGameButton',
    href: `#${PageId.LevelSelectPage}`,
  },
  openSettingsButton: {
    pageName: PageId.HomePage,
    id: 'openSettingsButton',
    href: `#${PageId.SettingsPage}`,
  },
  openAuthorsButton: {
    pageName: PageId.HomePage,
    id: 'openAuthorsButton',
    href: `#${PageId.AuthorsPage}`,
  },
};
