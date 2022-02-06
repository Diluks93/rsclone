import {
  homeTitleProps,
  homeLinkButtonProps,
  TEXT_ERROR,
  SCREEN_RESOLUTION,
  TOOLTIP,
} from './../../core/constants/constHome';
import Page from '../../core/templates/Page';
import './style.scss';
import { GameTranslationInterface, LanguageKeys, PopupDisplay } from '../../core/types/types';
import { turnOnBackgroundMusic } from '../../core/utils/utils';
import { backgroundMusic } from '../../core/constants/constAudio';

let popupDisplay: PopupDisplay = true;
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

  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys): void {
    this.gameTitle.style.backgroundImage = `url(${translation[lang].gameTitle})`;
    this.startGameButton.textContent += translation[lang].startGameButton;
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

  rangeErrorOutput(): HTMLDivElement {
    const rangeError = document.createElement('div');
    rangeError.classList.add('range-error');
    rangeError.innerText = TEXT_ERROR;

    return rangeError;
  }

  addTooltip(): HTMLDivElement {
    const tooltip = document.createElement('div');
    const tooltipWrap = document.createElement('div');
    const informationalText = document.createElement('p');
    const actionText = document.createElement('p');

    tooltip.classList.add('tooltip');
    tooltipWrap.classList.add('tooltip__wrapper');
    informationalText.classList.add('tooltip__informational-text');
    actionText.classList.add('tooltip__action-text');

    informationalText.innerText = TOOLTIP.informationalText;
    actionText.innerText = TOOLTIP.actionText;

    tooltipWrap.append(informationalText, actionText);
    tooltip.append(tooltipWrap);

    const toogler = true;
    const flashing = setInterval(() => {
      if (toogler) actionText.classList.toggle('active');
    }, 1000);

    document.addEventListener('click', () => {
      this.hideTooltip(tooltip);
      turnOnBackgroundMusic(backgroundMusic);
      clearInterval(flashing);
    });

    return tooltip;
  }

  hideTooltip(element: HTMLDivElement) {
    element.classList.add('hide');
    popupDisplay = false;
  }

  render() {
    if (
      document.documentElement.clientHeight < SCREEN_RESOLUTION.minHeight ||
      document.documentElement.clientWidth < SCREEN_RESOLUTION.minWidth
    ) {
      this.container.append(this.rangeErrorOutput());
    } else {
      this.container.append(this.gameTitle);
      this.container.append(this.homeButtonsWrapper);
      if (popupDisplay) this.container.append(this.addTooltip());
    }

    return this.container;
  }
}

export default HomePage;
