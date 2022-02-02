import Page from '../../core/templates/Page';
import { config } from '../../core/game/game';
import './style.scss';

class MainPage extends Page {
  static TextObject = {
    mainTitle: 'Main Page',
  };

  render() {
    new Phaser.Game(config);
    return this.container;
  }
}

export default MainPage;
