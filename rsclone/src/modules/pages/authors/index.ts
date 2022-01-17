import { authorsTitleProps } from './../../core/constants/constAuthors';
import Page from '../../core/templates/page';
import { buttonsAuthors } from '../../core/constants/constAuthors';
import './style.scss';

class AuthorsPage extends Page {
  static TextObject = {
    mainTitle: 'Над проектом работали',
  };

  render() {
    this.container.append(this.createHeaderTitle(authorsTitleProps));
    this.renderPageButtons(buttonsAuthors);
    return this.container;
  }
}

export default AuthorsPage;
