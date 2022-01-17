import { backBtnProps } from './../constants/constBackBtn';
import BackToMainBtn from '../components/BackToMainBtn';
import { LinkButtonType } from '../types/types';
import { TitleType } from '../types/types';

abstract class Page {
  protected container: HTMLElement;

  static TextObject = {};

  constructor(id: string, className: string) {
    this.container = document.createElement('main');
    this.container.id = id;
    this.container.className = className;
  }

  protected renderBackBtn() {
    const backToMainBtn = new BackToMainBtn('div', 'back-btn');
    this.container.append(backToMainBtn.createButton(backBtnProps));
  }

  protected createHeaderTitle({ pageName, id, text, tagName, imageUrl }: TitleType): HTMLElement {
    const headerTitle = document.createElement(tagName);
    if (text !== undefined) {
      headerTitle.innerText = text;
    }
    headerTitle.className = `${pageName}__title`;
    headerTitle.id = id;
    if (imageUrl !== undefined) {
      headerTitle.style.backgroundImage = `url(${imageUrl})`;
    }
    return headerTitle;
  }

  protected createLinkButtons(props: LinkButtonType[]): HTMLAnchorElement[] {
    const settingsLinkButtons = props.map(({ id, text, href, pageName, className }) => {
      const link = document.createElement('a');
      link.classList.add('primary-btn', `${pageName}__btn`, `${pageName}__btn--${className}`, 'basic-hover');
      link.id = id;
      link.textContent = text;
      link.href = href;
      return link;
    });
    return settingsLinkButtons;
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default Page;
