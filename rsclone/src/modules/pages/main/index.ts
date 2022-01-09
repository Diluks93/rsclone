import Page from '../../core/templates/page';
import './style.scss';

class MainPage extends Page {
  static TextObject = {
    mainTitle: 'Main Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  };

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.mainTitle, 'h2', 'title');
    this.container.append(title);
    return this.container;
  };

};

export default MainPage;