import { backButtonProps } from './../constants/constBackButton';
import { backToMainButton } from '../components/BackToMainButton';
import { GameTranslationInterface, LanguageKeys, LinkButtonType } from '../types/types';
import { TitleType } from '../types/types';

abstract class Page {
  protected container: HTMLElement;

  static TextObject = {};

  backToMainButton: HTMLAnchorElement;

  constructor(id: string, className: string) {
    this.container = document.createElement('main');
    this.container.id = id;
    this.container.className = className;
    this.backToMainButton = backToMainButton.createButton(backButtonProps);
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

  protected createLinkButton({ id, href, pageName, className }: LinkButtonType): HTMLAnchorElement {
    const linkButton = document.createElement('a');
    linkButton.classList.add('primary-button', `${pageName}__button`, 'basic-hover');
    linkButton.id = id;
    linkButton.href = href;
    return linkButton;
  }

  // todo: check if redefine works
  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys): void {
    return;
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default Page;
