import Page from '../../core/templates/Page';
import { config } from '../../core/game/game';
import './style.scss';
import { GameTranslationInterface, LanguageKeys } from '../../core/types/types';

class MainPage extends Page {
  exitModal: HTMLElement;

  static TextObject = {
    mainTitle: 'Main Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
    this.exitModal = this.createExitModal();
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.exitModal.classList.toggle('hidden');
      }
    });
  }

  private createCloseGameButton(): HTMLElement {
    const closeButton = document.createElement('a');
    closeButton.classList.add('primary-button', 'main-page__button', 'basic-hover');
    closeButton.href = '#levels-page';
    closeButton.textContent = 'V';

    closeButton.addEventListener('click', () => {
      const canvasParent = document.getElementById('first-step');
      canvasParent?.classList.add('hidden');
    });
    return closeButton;
  }

  private createExitCancelButton(): HTMLElement {
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('primary-button', 'main-page__button', 'basic-hover');
    cancelButton.textContent = 'X';

    cancelButton.addEventListener('click', () => {
      this.exitModal.classList.add('hidden');
    });

    return cancelButton;
  }

  private createExitModal(): HTMLElement {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper', 'hidden');
    const modalWarning = document.createElement('span');
    modalWarning.classList.add('modal__warning');
    modalWarning.textContent = 'Желаете покинуть игру?';
    const modalInner = document.createElement('div');
    modalInner.classList.add('modal__inner');
    const closeButton = this.createCloseGameButton();
    const cancelButton = this.createExitCancelButton();
    modalInner.append(closeButton, cancelButton);
    modalWrapper.append(modalWarning, modalInner);
    return modalWrapper;
  }

  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys): void {
    const modalWarning = this.exitModal.querySelector('span');
    modalWarning!.textContent = translation[lang].exitWarning;
  }

  render() {
    new Phaser.Game(config);
    this.container.append(this.exitModal);
    return this.container;
  }
}

export default MainPage;
