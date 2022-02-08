import Page from '../../core/templates/Page';
import { config } from '../../core/game/config';
import { turnOnBackgroundMusic } from '../../core/utils/utils';
import { backgroundMusic } from '../../core/constants/constAudio';
import { GameTranslationInterface, LanguageKeys } from '../../core/types/types';
import './style.scss';

class MainPage extends Page {
  exitModal: HTMLElement;
  static TextObject = {
    mainTitle: 'Main Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
    this.exitModal = this.createExitGameModal();
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.exitModal.classList.toggle('hidden');
      }
    });
  }

  private createExitGameButton(): HTMLElement {
    const exitButton = document.createElement('a');
    exitButton.classList.add('primary-button', 'main-page__button', 'basic-hover');
    exitButton.href = '#levels-page';
    exitButton.textContent = 'V';

    exitButton.addEventListener('click', (e: MouseEvent) => {
      turnOnBackgroundMusic(backgroundMusic, e);
      const canvasParent = document.getElementById('first-step');
      canvasParent?.classList.add('hidden');
    });

    return exitButton;
  }

  private createCancelButton(): HTMLElement {
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('primary-button', 'main-page__button', 'basic-hover');
    cancelButton.textContent = 'X';

    cancelButton.addEventListener('click', () => {
      this.exitModal.classList.add('hidden');
    });

    return cancelButton;
  }

  private createExitGameModal(): HTMLElement {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper', 'hidden');
    const modalWarning = document.createElement('span');
    modalWarning.classList.add('modal__warning');
    modalWarning.textContent = 'Желаете покинуть игру?';
    const modalInner = document.createElement('div');
    modalInner.classList.add('modal__inner');
    const closeButton = this.createExitGameButton();
    const cancelButton = this.createCancelButton();
    modalInner.append(closeButton, cancelButton);
    modalWrapper.append(modalWarning, modalInner);

    return modalWrapper;
  }

  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys): void {
    const modalWarning = this.exitModal.querySelector('span');
    modalWarning!.textContent = translation[lang].exitWarning;
  }

  render(): HTMLElement {
    window.game = new Phaser.Game(config);
    this.container.append(this.exitModal);

    return this.container;
  }
};

export default MainPage;
