import { PageId } from '../enums/enums';
import { DescriptionType, LevelPreviewInterface, LinkButtonType, LevelTitleInterface } from '../types/types';

export const levelPageTitleProps: LevelTitleInterface = {
  tutorialTitle: {
    pageName: 'levels-page',
    id: 'tutorialTitle',
    tagName: 'h2',
  },
  seasonOneTitle: {
    pageName: 'levels-page',
    id: 'seasonOneTitle',
    tagName: 'h2',
  },

  levelDetailsTitle: {
    pageName: 'levels-page',
    id: 'levelTitle',
    tagName: 'h2',
  },
};

export const levelDetailsProps: DescriptionType = {
  timeLimitId: 'timeLimit',
  ratingCountId: 'ratingCount',
  hintId: 'hintText',
  levelDescriptionId: 'levelDescriptionText',
};

export const levelPreviewProps: LevelPreviewInterface = {
  tutorialTitle: [
    {
      id: 0,
      imageUrl: '#',
      isLocked: false,
    },
    {
      id: 1,
      imageUrl: '#',
      isLocked: false,
    },
    {
      id: 2,
      imageUrl: '#',
      isLocked: false,
    },
  ],
  seasonOneTitle: [
    {
      id: 3,
      imageUrl: '#',
      isLocked: true,
    },
    {
      id: 4,
      imageUrl: '#',
      isLocked: true,
    },
    {
      id: 5,
      imageUrl: '#',
      isLocked: true,
    },
  ],
};

export const levelLinkButtonProps: Record<string, LinkButtonType> = {
  playLevelButton: {
    pageName: PageId.LevelSelectPage,
    id: 'play-level-button',
    href: `#${PageId.MainPage}`,
    iconId: 'play',
  },
};
