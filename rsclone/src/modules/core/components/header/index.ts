import Component from '../../templates/Component';
import { PageId } from '../../enums/enums';
import '../style.scss';

const buttons = [
  {
    id: PageId.HomePage,
    text: 'Home Page',
  },
  {
    id: PageId.MainPage,
    text: 'Main Page',
  },
  {
    id: PageId.AuthorsPage,
    text: 'Authors Page',
  },
  {
    id: PageId.SettingsPage,
    text: 'Settings Page',
  },
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
