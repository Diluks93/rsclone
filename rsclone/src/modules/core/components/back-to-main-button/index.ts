import Component from '../../templates/Component';
import { LinkButtonType } from '../../types/types';
import '../style.scss';
import SvgIcon from '../SvgIcon';
import './style.scss';

class BackToMainButton extends Component {
  createButton({ id, href, className, iconId }: LinkButtonType): HTMLAnchorElement {
    const linkButton = document.createElement('a');
    linkButton.classList.add('primary-button', 'basic-hover');

    if (className) {
      linkButton.classList.add(className);
    }

    if (iconId) {
      linkButton.append(new SvgIcon(iconId).render());
    }

    linkButton.id = id;
    linkButton.href = href;
    return linkButton;
  }
}

export const backToMainButton = new BackToMainButton('div', 'back-button');
