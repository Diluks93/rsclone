import Demo from '../../core/utils/game'
import Page from '../../core/templates/Page';
import './style.scss';

class MainPage extends Page {
  static TextObject = {
    mainTitle: 'Main Page',
  };

  render() {
    return this.container;
  }
}

export default MainPage;
const config = {
  type: Phaser .AUTO,
  backgroundColor: '#125555',
  width: window.innerWidth,
  height: window.innerHeight,
  scene: Demo
};