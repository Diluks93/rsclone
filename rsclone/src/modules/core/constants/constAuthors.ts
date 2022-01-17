import { settingsStore } from './../stores/settingsStore';
import { ButtonAuthorsOrNames, TitleType } from '../types/types';
import gameTranslation from '../data/gameTranslation.json';

export const authorsTitleProps: TitleType = {
  pageName: 'authors-page',
  text: gameTranslation[settingsStore.languageValue].authorsTitle,
  id: 'authorsTitle',
  tagName: 'h1',
};

export const buttonsAuthors: ButtonAuthorsOrNames = [
  {
    text: 'Diluks93',
    url: 'https://diluks93.github.io/rsschool-cv/',
  },
  {
    text: 'Jenya-b',
    url: 'https://jenya-b.github.io/rsschool-cv/',
  },
  {
    text: 'Randomspells',
    url: 'https://randomspells.github.io/rsschool-cv/',
  },
];
