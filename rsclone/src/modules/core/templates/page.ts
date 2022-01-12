import { ButtonAuthors } from '../types/types';

abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  constructor(id: string, className: string) {
    this.container = document.createElement('main');
    this.container.id = id;
    this.container.className = className;
  };

  protected createHeaderTitle(title: string, tagName: string, className: string): HTMLElement {
    const headerTitle = document.createElement(tagName);
    headerTitle.innerText = title;
    headerTitle.className = className;
    return headerTitle;
  };

  protected renderPageButtons(buttons: ButtonAuthors) {
    const pageButtons = document.createElement('div');
    pageButtons.className = 'btn';
    buttons.forEach(({text, id, url}) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.className = 'btn__item';
      buttonHTML.href = id ? `#${id}` : `${url}`;
      buttonHTML.innerText = text;
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  };

  render(): HTMLElement {
    return this.container;
  };
};

export default Page;