import Component from '../../templates/Component';
import { LinkButtonType } from '../../types/types';
import '../style.scss';
import './style.scss';

class BackToMainBtn extends Component {
  createButton({ id, text, href, className }: LinkButtonType): HTMLAnchorElement {
    const link = document.createElement('a');
    link.classList.add('primary-btn', className, 'basic-hover');
    link.id = id;
    link.textContent = text;
    link.href = href;
    return link;
  }
}

export default BackToMainBtn;
