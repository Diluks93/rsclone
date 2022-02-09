import Page from '../../core/templates/Page';
import { config } from '../../core/game/game';
import './style.scss';
import { turnOnBackgroundMusic } from '../../core/utils/utils';
import { backgroundMusic } from '../../core/constants/constAudio';
import { GameTranslationInterface, LanguageKeys } from '../../core/types/types';
import { GameKey, PageId } from '../../core/enums/enums';

class MainPage extends Page {
  exitModal: HTMLElement;

  game: Phaser.Game | undefined;

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
    window.addEventListener('hashchange', (e: HashChangeEvent) => {
      if (e.oldURL.includes(PageId.MainPage)) {
        this.closeGame();
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
      this.closeGame();
    });
    return exitButton;
  }

  private closeGame(): void {
    const canvasParent = document.getElementById(GameKey.CanvasParent);
    if (canvasParent) {
      canvasParent.classList.add('hidden');
      if (this.game) {
        this.game.destroy(true, false);
      }
    }
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

  render() {
    this.game = new Phaser.Game(config);
    this.container.append(this.exitModal);
    return this.container;
  }
}

export default MainPage;
