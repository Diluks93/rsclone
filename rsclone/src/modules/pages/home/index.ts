import { homeTitleProps, homeLinkButtonProps } from './../../core/constants/constHome';
import Page from '../../core/templates/Page';
import './style.scss';
import { GameTranslationInterface, LanguageKeys } from '../../core/types/types';

class HomePage extends Page {
  homeButtonsWrapper: HTMLDivElement;

  gameTitle: HTMLElement;

  startGameButton: HTMLAnchorElement;

  openSettingsButton: HTMLAnchorElement;

  openAuthorsButton: HTMLAnchorElement;

  constructor(id: string, className: string) {
    super(id, className);
    this.gameTitle = this.createHeaderTitle(homeTitleProps);
    this.startGameButton = this.createLinkButton(homeLinkButtonProps.startGameButton);
    this.openSettingsButton = this.createLinkButton(homeLinkButtonProps.openSettingsButton);
    this.openAuthorsButton = this.createLinkButton(homeLinkButtonProps.openAuthorsButton);
    this.homeButtonsWrapper = this.createWrapper('home-page__wrapper');
  }

  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys) {
    this.gameTitle.style.backgroundImage = `url(${translation[lang].gameTitle})`;
    this.startGameButton.textContent = translation[lang].startGameButton;
    this.openSettingsButton.textContent = translation[lang].openSettingsButton;
    this.openAuthorsButton.textContent = translation[lang].openAuthorsButton;
  }

  createWrapper(className: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(className);

    wrapper.append(this.startGameButton);
    wrapper.append(this.openSettingsButton);
    wrapper.append(this.openAuthorsButton);

    return wrapper;
  }

  render() {
    this.container.append(this.gameTitle);
    this.container.append(this.homeButtonsWrapper);

    return this.container;
  }
}

export default HomePage;
