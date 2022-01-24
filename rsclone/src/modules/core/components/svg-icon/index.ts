class SvgIcon {
  html: string;

  constructor(id: string) {
    this.html = `
    <svg class="button-icon">
      <use xlink:href="#${id}"></use>
    </svg>
    `;
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = this.html;
    return template.content;
  }
}

export default SvgIcon;
