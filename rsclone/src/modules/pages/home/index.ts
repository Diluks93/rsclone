import { PageIds } from '../../core/interfaces/enums';
import Page from '../../core/templates/page';
import './style.scss';

const buttons = [
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

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    pageButtons.className = 'btn';
    buttons.forEach(({text, id}) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.className = 'btn btn__item';
      buttonHTML.href = `#${id}`;
      buttonHTML.innerText = text;
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  };

  render() {
    const title = this.createHeaderTitle('', 'h1', 'title title__main');
    this.container.append(title);
    this.renderPageButtons();
    return this.container;
  };

};

export default HomePage;