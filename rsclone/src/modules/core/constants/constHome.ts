import { LinkButtonInterface, ScreenResolutionType, TitleType } from './../types/types';
import { PageId } from '../enums/enums';

export const TEXT_ERROR = 'Out of screen range. Minimum resolution 1024x600.';

export const fullscreenModeTooltip = {
  informationText: 'To switch to full screen mode, press "F"',
  actionText: '[click here]',
};

export const screenResolution: ScreenResolutionType = {
  minHeight: 600,
  minWidth: 1024,
};

export const homeTitleProps: TitleType = {
  pageName: 'home-page',
  id: 'gameTitle',
  tagName: 'div',
};

const PAGE_NAME = 'home-page';
export const homeLinkButtonProps: LinkButtonInterface = {
  startGameButton: {
    pageName: PAGE_NAME,
    id: 'startGameButton',
    href: `#${PageId.LevelSelectPage}`,
  },
  openSettingsButton: {
    pageName: PAGE_NAME,
    id: 'openSettingsButton',
    href: `#${PageId.SettingsPage}`,
  },
  openAuthorsButton: {
    pageName: PAGE_NAME,
    id: 'openAuthorsButton',
    href: `#${PageId.AuthorsPage}`,
  },
};
