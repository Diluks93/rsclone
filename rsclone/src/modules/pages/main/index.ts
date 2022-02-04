import Page from '../../core/templates/Page';
import { config } from '../../core/game/game';
import './style.scss';

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
    linkButton.href = '#home-page';
    linkButton.textContent = 'x';

    linkButton.addEventListener('click', () => {
      const canvasParent = document.getElementById('first-step');
      // canvasParent?.classList.add('hidden');
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
