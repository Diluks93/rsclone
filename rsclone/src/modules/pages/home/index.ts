import { PageIds } from '../../core/enums/enums';
import Page from '../../core/templates/page';
import { ButtonsPagesOrAuthors } from '../../core/types/types';
import './style.scss';

const buttons: ButtonsPagesOrAuthors = [
  {
    text: 'Начать игру',
    id: PageIds.CategoriesPage
  },
  {
    text: 'Опции',
    id: PageIds.SettingsPage
  },
  {
    text: 'Авторы',
    id: PageIds.AuthorsPage
  },
]

class HomePage extends Page {
  static TextObject = {
    mainTitle: 'Как достать соседа',
  };

  constructor(id: string, className: string) {
    super(id, className);
  };

  render() {
    const title = this.createHeaderTitle(HomePage.TextObject.mainTitle, 'h1', 'title title__main');
    this.container.append(title);
    this.renderPageButtons(buttons);
    return this.container;
  };

};

export default HomePage;