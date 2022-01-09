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

  render(): HTMLElement {
    return this.container;
  };
};

export default Page;