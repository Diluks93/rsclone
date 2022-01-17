import Component from '../../templates/Component';
import '../style.scss';

const buttons = [
  {
    text: '<img src="https://raw.githubusercontent.com/Diluks93/stage1-tasks/christmas-task/assets/svg/rsschool.svg" alt="logo course">',
    url: 'https://rs.school/js/',
  },
  {
    text: '2022',
  },
  {
    text: 'Diluks93 | ',
    url: 'https://github.com/Diluks93',
  },
  {
    text: 'Jenya-b | ',
    url: 'https://github.com/jenya-b',
  },
  {
    text: 'Randomspells',
    url: 'https://github.com/randomspells',
  },
];

class Footer extends Component {
  renderPageButtons() {
    const pageButtons = document.createElement('ul');
    const wrapper = document.createElement('div');
    pageButtons.className = 'items';
    buttons.forEach(({ text, url }, ind) => {
      let buttonHTML: HTMLAnchorElement | HTMLTimeElement;
      if (ind === 0 || ind >= 2) {
        buttonHTML = document.createElement('a');
        buttonHTML.href = `${url}`;
        buttonHTML.setAttribute('target', 'blank');
        if (ind === 0) {
          buttonHTML.innerHTML = `${text}`;
          pageButtons.append(buttonHTML);
        } else {
          buttonHTML.innerText = `${text}`;
          wrapper.append(buttonHTML);
        }
      } else {
        buttonHTML = document.createElement('time');
        buttonHTML.dateTime = buttonHTML.innerText = `© ${text}`;
        pageButtons.append(buttonHTML);
      }
      buttonHTML.className = 'item';
      pageButtons.append(wrapper);
    });
    this.container.append(pageButtons);
  }
}

export default Footer;
