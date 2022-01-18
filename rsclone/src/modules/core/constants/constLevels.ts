import { settingsStore } from '../stores/settingsStore';
import { DescriptionType, TitleType } from '../types/types';
import gameTranslation from '../data/gameTranslation.json';
import levelsTranslation from '../data/levelsTranslation.json';

const PAGE_NAME = 'levels-page';
const NUMBER_SERIES_SECTIONS = 2;
const PREPARATORY_LEVEL_NUMBER = 3;
const MAIN_LEVEL_NUMBER = 4;
const INITIAL_RATING = '0';

export const numericConstants = {
  NUMBER_SERIES_SECTIONS,
  PREPARATORY_LEVEL_NUMBER,
  MAIN_LEVEL_NUMBER,
};

export const levelTitlesProps: TitleType[] = [
  {
    pageName: PAGE_NAME,
    text: gameTranslation[settingsStore.languageValue].tutorialTitle,
    id: 'tutorialTitle',
    tagName: 'h2',
  },
  {
    pageName: PAGE_NAME,
    text: gameTranslation[settingsStore.languageValue].seasonOneTitle,
    id: 'seasonOneTitle',
    tagName: 'h2',
  },
];

export const levelDescriptionProps: DescriptionType[] = [
  {
    pageName: PAGE_NAME,
    titleProps: {
      pageName: PAGE_NAME,
      text: levelsTranslation[settingsStore.languageValue].levelsDetailsBlock[0].levelTitle,
      id: 'levelTitle',
      tagName: 'h2',
    },

    timeLimitText: levelsTranslation[settingsStore.languageValue].levelsDetailsBlock[0].timeLimit,
    timeLimitId: 'timeLimit',

    ratingCount: INITIAL_RATING,
    ratingCountId: 'ratingCount',

    hintText: levelsTranslation[settingsStore.languageValue].levelsDetailsBlock[0].hintText,
    hintId: 'hintText',

    levelDescriptionText: levelsTranslation[settingsStore.languageValue].levelsDetailsBlock[0].levelDescriptionText,
    levelDescriptionId: 'levelDescriptionText',
  },
];
