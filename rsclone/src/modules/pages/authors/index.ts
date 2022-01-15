import Page from '../../core/templates/page';
import { buttonsAuthors } from '../../core/constants/constAuthors'
import './style.scss';


class AuthorsPage extends Page {
  static TextObject = {
    mainTitle: 'Над проектом работали',
  };

  constructor(id: string, className: string) {
    super(id, className);
  };

  render() {
    const title = this.createHeaderTitle(AuthorsPage.TextObject.mainTitle, 'h2', 'title__authors')
    this.container.append(title);
    this.renderPageButtons(buttonsAuthors);
    return this.container;
  };

};

export default AuthorsPage;