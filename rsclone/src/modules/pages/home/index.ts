import { PageIds } from '../../core/enums/enums';
import { ButtonAuthorsOrNames } from '../../core/types/types';
import Page from '../../core/templates/page';
import './style.scss';

const buttons: ButtonAuthorsOrNames = [
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
  

  constructor(id: string, className: string) {
    super(id, className);
  };

  render() {
    const title = this.createHeaderTitle('', 'h1', 'title title__main');
    this.container.append(title);
    this.renderPageButtons(buttons);
    return this.container;
  };

};

export default HomePage;