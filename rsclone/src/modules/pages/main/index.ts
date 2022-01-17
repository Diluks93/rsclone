import Page from '../../core/templates/page';
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
