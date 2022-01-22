class SvgIcon {
  html: string;

  constructor(id: string, className: string) {
    this.html = `
    <svg class="${className}">
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
