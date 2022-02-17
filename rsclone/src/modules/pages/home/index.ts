import Page from '../../core/templates/Page';
import { GameTranslationInterface, LanguageKeys } from '../../core/types/types';
import { turnOnBackgroundMusic } from '../../core/utils/utils';
import { backgroundMusic } from '../../core/constants/constAudio';
import { PageId, StorageKey } from '../../core/enums/enums';
import { homeTitleProps, homeLinkButtonProps, TEXT_ERROR, screenResolution } from './../../core/constants/constHome';
import './style.scss';

class HomePage extends Page {
  homeButtonsWrapper: HTMLDivElement;

  gameTitle: HTMLElement;

  startGameButton: HTMLAnchorElement;

  openSettingsButton: HTMLAnchorElement;

  openAuthorsButton: HTMLAnchorElement;

  fullScreenModal: HTMLDivElement;

  parkLayer: HTMLDivElement;

  heroLayer: HTMLDivElement;

  heroPosition = 0;

  heroVelocity = 3;

  isFlipX = false;

  isFullScreenModalShown = this.getShownModalStateFromStorage() || false;

  constructor(id: string, className: string) {
    super(id, className);
    this.gameTitle = this.createHeaderTitle(homeTitleProps);
    this.startGameButton = this.createLinkButton(homeLinkButtonProps.startGameButton);
    this.openSettingsButton = this.createLinkButton(homeLinkButtonProps.openSettingsButton);
    this.openAuthorsButton = this.createLinkButton(homeLinkButtonProps.openAuthorsButton);
    this.homeButtonsWrapper = this.createWrapper(`${PageId.HomePage}__wrapper`);
    this.fullScreenModal = this.createFullScreenModal();
    this.parkLayer = this.createParkLayer();
    this.heroLayer = this.createHeroLayer();
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

  createFullScreenModal(): HTMLDivElement {
    const fullScreenModal = document.createElement('div');
    const modalWrapper = document.createElement('div');
    const modalWarningText = document.createElement('p');
    const modalActionText = document.createElement('p');
    const baseClass = 'fullscreen-modal';
    fullScreenModal.classList.add(baseClass);
    modalWrapper.classList.add(`${baseClass}__wrapper`);
    modalWarningText.classList.add(`${baseClass}__warning-text`);
    modalActionText.classList.add(`${baseClass}__action-text`);
    modalWrapper.append(modalWarningText, modalActionText);
    fullScreenModal.append(modalWrapper);
    modalActionText.addEventListener('click', () => {
      fullScreenModal.classList.add('hidden');
      turnOnBackgroundMusic(backgroundMusic);
      this.isFullScreenModalShown = true;
    });

    return fullScreenModal;
  }

  createParkLayer(): HTMLDivElement {
    const parkLayer = document.createElement('div');
    parkLayer.classList.add(`${PageId.HomePage}__park`);
    return parkLayer;
  }

  createHeroLayer(): HTMLDivElement {
    const heroLayer = document.createElement('div');
    heroLayer.classList.add(`${PageId.HomePage}__hero`);
    return heroLayer;
  }

  moveHero() {
    requestAnimationFrame(() => this.moveHero());
    const { x: heroX, width: heroWidth } = this.heroLayer.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    if (heroX < 0 || heroX > windowWidth - heroWidth) {
      this.isFlipX = !this.isFlipX;
      this.heroVelocity = -this.heroVelocity;
    }
    this.heroPosition += this.heroVelocity;
    const currentFlipX = this.isFlipX ? -1 : 1;
    const currentTranslate = this.isFlipX ? -this.heroPosition : this.heroPosition;
    this.heroLayer.style.transform = `scale(${currentFlipX},1) translateX(${currentTranslate}%)`;
  }

  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys): void {
    this.gameTitle.style.backgroundImage = `url(${translation[lang].gameTitle})`;
    this.startGameButton.textContent += translation[lang].startGameButton;
    this.openSettingsButton.textContent = translation[lang].openSettingsButton;
    this.openAuthorsButton.textContent = translation[lang].openAuthorsButton;

    const warningText = this.fullScreenModal.firstElementChild?.firstElementChild as HTMLParagraphElement;
    const actionText = this.fullScreenModal.firstElementChild?.lastElementChild as HTMLParagraphElement;
    warningText.textContent = translation[lang].fullScreenWarningText;
    actionText.textContent = translation[lang].fullScreenActionText;
  }

  getShownModalStateFromStorage(): boolean | undefined | never {
    try {
      return JSON.parse(localStorage.getItem(StorageKey.IsFullScreenModalShown) as string);
    } catch (e) {
      console.error(e);
    }
  }

  render(): HTMLElement {
    if (
      document.documentElement.clientHeight < screenResolution.minHeight ||
      document.documentElement.clientWidth < screenResolution.minWidth
    ) {
      this.container.append(this.rangeErrorOutput());
    } else {
      this.parkLayer.append(this.heroLayer);
      this.moveHero();
      this.container.append(this.gameTitle, this.homeButtonsWrapper, this.parkLayer);

      if (!this.isFullScreenModalShown) {
        this.container.append(this.fullScreenModal);
      }
    }

    turnOnBackgroundMusic(backgroundMusic);
    return this.container;
  }
}

export default HomePage;
