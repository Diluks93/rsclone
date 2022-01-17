import { authorLinkButtonsProps, authorsTitleProps } from './../../core/constants/constAuthors';
import Page from '../../core/templates/Page';
import './style.scss';
import { LinkButtonType } from '../../core/types/types';

class AuthorsPage extends Page {
  static TextObject = {
    mainTitle: 'Над проектом работали',
  };

  createAuthorButtons(props: LinkButtonType[]): HTMLDivElement[] {
    const settingsLinkButtons = props.map(({ id, text, href, pageName, className, subTitle }) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add(`${pageName}__wrapper`, `${pageName}__wrapper--${text.toLowerCase()}`);

      const inner = document.createElement('div');
      inner.className = `${pageName}__inner`;

      const subtitle = document.createElement('span');
      subtitle.className = `${pageName}__subtitle`;
      if (subTitle !== undefined) {
        subtitle.textContent = subTitle;
      }
      subtitle.id = id;

      const link = document.createElement('a');
      link.classList.add('primary-btn', `${pageName}__btn`, `${pageName}__btn--${className}`, 'basic-hover');
      link.textContent = text;
      link.href = href;

      inner.append(link);
      inner.append(subtitle);
      wrapper.append(inner);

      return wrapper;
    });
    return settingsLinkButtons;
  }

  renderWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    wrapper.append(this.createHeaderTitle(authorsTitleProps));
    this.createAuthorButtons(authorLinkButtonsProps).forEach((item) => wrapper.append(item));
    this.container.append(wrapper);
  }

  render() {
    this.renderBackBtn();
    this.renderWrapper();
    return this.container;
  }
}

export default AuthorsPage;
