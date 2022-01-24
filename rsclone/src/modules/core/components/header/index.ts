import Component from '../../templates/component';
import { PageIds } from '../../enums/enums';
import '../style.scss';

const buttons = [
  {
    id: PageIds.HomePage,
    text: 'Home Page',
  },
  {
    id: PageIds.MainPage,
    text: 'Main Page',
  },
  {
    id: PageIds.AuthorsPage,
    text: 'Authors Page',
  },
  {
    id: PageIds.SettingsPage,
    text: 'Settings Page',
  }
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  remove() {
    this.container.remove();
  }

  renderPageButtons() {
    const pageButtons = document.createElement('nav');
    pageButtons.className = 'nav items';
    buttons.forEach(({ id, text }) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${id}`;
      buttonHTML.innerText = text;
      buttonHTML.className = 'item';
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }
}

export default Header;
