import { settingsStore } from './../stores/settingsStore';
import { LinkButtonType, TitleType } from '../types/types';
import gameTranslation from '../data/gameTranslation.json';

const PAGE_NAME = 'authors-page';

export const authorsTitleProps: TitleType = {
  pageName: 'authors-page',
  text: gameTranslation[settingsStore.languageValue].authorsTitle,
  id: 'authorsTitle',
  tagName: 'h1',
};

export const authorLinkButtonsProps: LinkButtonType[] = [
  {
    pageName: PAGE_NAME,
    text: 'Diluks93',
    className: gameTranslation.en.backToMainBtn.toLowerCase(),
    id: 'diluksSubtitle',
    subTitle: gameTranslation[settingsStore.languageValue].diluksSubtitle,
    href: 'https://diluks93.github.io/rsschool-cv/',
  },
  {
    pageName: PAGE_NAME,
    text: 'jenya-b',
    className: gameTranslation.en.saveSettingsBtn.toLowerCase(),
    id: 'jenyaSubtitle',
    subTitle: gameTranslation[settingsStore.languageValue].jenyaSubtitle,
    href: 'https://jenya-b.github.io/rsschool-cv/',
  },
  {
    pageName: PAGE_NAME,
    text: 'Randomspells',
    className: gameTranslation.en.saveSettingsBtn.toLowerCase(),
    id: 'randomspellsSubtitle',
    subTitle: gameTranslation[settingsStore.languageValue].randomspellsSubtitle,
    href: 'https://randomspells.github.io/rsschool-cv/',
  },
];
