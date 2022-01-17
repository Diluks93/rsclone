abstract class Component {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  renderPageButtons() {
    const pageButtons = document.createElement('a');
    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}

export default Component;
