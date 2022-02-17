import { IconId } from './../../enums/enums';
import Component from '../../templates/component';
import { LinkButtonType } from '../../types/types';
import SvgIcon from '../svg-icon';
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
    link.append(new SvgIcon(IconId.ArrowLeft).render());
    return link;
  }
}

export const backToMainButton = new BackToMainButton('div', 'back-button');
