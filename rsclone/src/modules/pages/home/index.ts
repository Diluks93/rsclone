import { homeTitleProps, homeLinkButtonProps, TEXT_ERROR, screenResolution } from './../../core/constants/constHome';
import Page from '../../core/templates/Page';
import './style.scss';
import { GameTranslationInterface, LanguageKeys } from '../../core/types/types';
import { turnOnBackgroundMusic } from '../../core/utils/utils';
import { backgroundMusic } from '../../core/constants/constAudio';
import { StorageKey } from '../../core/enums/enums';

class HomePage extends Page {
  homeButtonsWrapper: HTMLDivElement;

  gameTitle: HTMLElement;

  startGameButton: HTMLAnchorElement;

  openSettingsButton: HTMLAnchorElement;

  openAuthorsButton: HTMLAnchorElement;

  fullScreenModal: HTMLDivElement;

  constructor(id: string, className: string) {
    super(id, className);
    this.gameTitle = this.createHeaderTitle(homeTitleProps);
    this.startGameButton = this.createLinkButton(homeLinkButtonProps.startGameButton);
    this.openSettingsButton = this.createLinkButton(homeLinkButtonProps.openSettingsButton);
    this.openAuthorsButton = this.createLinkButton(homeLinkButtonProps.openAuthorsButton);
    this.homeButtonsWrapper = this.createWrapper('home-page__wrapper');
    this.fullScreenModal = this.createFullScreenModal();
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
      localStorage.setItem(StorageKey.isFullScreenModalShown, JSON.stringify(true));
    });

    return fullScreenModal;
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

  render() {
    if (
      document.documentElement.clientHeight < screenResolution.minHeight ||
      document.documentElement.clientWidth < screenResolution.minWidth
    ) {
      this.container.append(this.rangeErrorOutput());
    } else {
      this.container.append(this.gameTitle);
      this.container.append(this.homeButtonsWrapper);

      const isFullScreenModalShown: boolean = JSON.parse(
        localStorage.getItem(StorageKey.isFullScreenModalShown) as string
      );
      if (!isFullScreenModalShown) this.container.append(this.fullScreenModal);
      turnOnBackgroundMusic(backgroundMusic);
    }

    return this.container;
  }
}

export default HomePage;
