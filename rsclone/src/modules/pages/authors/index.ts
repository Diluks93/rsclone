import Page from '../../core/templates/page';
import './style.scss';

class AuthorsPage extends Page {
  static TextObject = {
    mainTitle: 'Authors Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  };

  render() {
    const title = this.createHeaderTitle(AuthorsPage.TextObject.mainTitle, 'h2', 'title')
    this.container.append(title);
    return this.container;
  };

};

export default AuthorsPage;