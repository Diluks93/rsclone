import Component from '../../templates/Component';
import { LinkButtonType } from '../../types/types';
import '../style.scss';
import './style.scss';

class BackToMainButton extends Component {
  createButton({ id, href, className }: LinkButtonType): HTMLAnchorElement {
    const link = document.createElement('a');
    link.classList.add('primary-button', 'basic-hover');
    if (className) {
      link.classList.add(className);
    }
    link.id = id;
    link.href = href;
    return link;
  }
}

export const backToMainButton = new BackToMainButton('div', 'back-button');
