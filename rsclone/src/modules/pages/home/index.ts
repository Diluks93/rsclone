import { homeTitleProps, homeLinkButtonsProps } from './../../core/constants/constHome';
import Page from '../../core/templates/page';
import './style.scss';

class HomePage extends Page {
  renderWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('home-page__wrapper');

    this.createLinkButtons(homeLinkButtonsProps).forEach((item) => wrapper.append(item));
    this.container.append(wrapper);
  }

  render() {
    const title = this.createHeaderTitle(homeTitleProps);
    this.container.append(title);
    this.renderWrapper();
    return this.container;
  }
}

export default HomePage;
