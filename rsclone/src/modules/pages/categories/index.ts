import Page from '../../core/templates/page';
import './style.scss';

class CategoriesPage extends Page {
  static TextObject = {
    mainTitle: 'Categories Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  };

  render() {
    const title = this.createHeaderTitle(CategoriesPage.TextObject.mainTitle, 'h2', 'title')
    this.container.append(title);
    return this.container;
  };

};

export default CategoriesPage;