import { DescriptionType, LevelPreviewInterface, LinkButtonType, LevelTitleInterface } from '../types/types';

const NUMBER_SERIES_SECTIONS = 2;
const PREPARATORY_LEVEL_NUMBER = 3;
const MAIN_LEVEL_NUMBER = 4;

export const numericConstants = {
  NUMBER_SERIES_SECTIONS,
  PREPARATORY_LEVEL_NUMBER,
  MAIN_LEVEL_NUMBER,
};

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
      id: 'firstSteps',
      imageUrl: '#',
      isLocked: false,
    },
    {
      id: 'owardsAndUpwards',
      imageUrl: '#',
      isLocked: false,
    },
    {
      id: 'hereWeGo',
      imageUrl: '#',
      isLocked: false,
    },
  ],
  seasonOneTitle: [
    {
      id: '4',
      imageUrl: '#',
      isLocked: true,
    },
    {
      id: '5',
      imageUrl: '#',
      isLocked: true,
    },
    {
      id: '6',
      imageUrl: '#',
      isLocked: true,
    },
  ],
};

export const levelLinkButtonProps: Record<string, LinkButtonType> = {
  playLevelButton: {
    pageName: 'levels-page',
    id: 'playLevelButton',
    href: '#main-page',
    iconId: 'play',
  },
};
