import Page from '../../core/templates/Page';
import { config } from '../../core/game/game';
import './style.scss';
import { turnOnBackgroundMusic } from '../../core/utils/utils';
import { backgroundMusic } from '../../core/constants/constAudio';

class MainPage extends Page {
  closeGameButton: HTMLElement;

  static TextObject = {
    mainTitle: 'Main Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
    this.closeGameButton = this.createCloseGameButton();
  }

  private createCloseGameButton(): HTMLElement {
    const linkButton = document.createElement('a');
    linkButton.classList.add('primary-button', 'main-page__button', 'basic-hover');
    linkButton.id = 'exit-level';
    linkButton.href = '#home-page';
    linkButton.textContent = 'x';

    linkButton.addEventListener('click', (e: MouseEvent) => {
      turnOnBackgroundMusic(backgroundMusic, e);
      const canvasParent = document.getElementById('first-step');
      canvasParent?.classList.add('hidden');
    });
    return linkButton;
  }

  render() {
    new Phaser.Game(config);
    this.container.append(this.closeGameButton);
    return this.container;
  }
}

export default MainPage;
