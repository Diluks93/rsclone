import { SettingsCheckboxType } from './../../core/types/settingsTypes';
import { rangesProps, checkboxesProps, buttonsProps } from '../../core/constants/constSettings';
import { SettingsButtonType, SettingsRangeType } from '../../core/types/settingsTypes';
import Page from '../../core/templates/page';
import './style.scss';

class SettingsPage extends Page {
  static TextObject = {
    mainTitle: 'Настройки',
  };

  getRangeLabels(props: SettingsRangeType[]): HTMLLabelElement[] {
    const settingsSliders = props.map((rangeProps) => {
      const range = document.createElement('input');
      range.type = 'range';
      range.id = rangeProps.id;
      range.classList.add('settings-page__range');

      const soundButton = document.createElement('button');
      soundButton.classList.add('settings-page__toggle-btn');
      soundButton.style.backgroundImage = `url(${rangeProps.iconUrl})`;

      const label = document.createElement('label');
      label.classList.add('settings-page__range-label');
      label.append(soundButton, range);
      return label;
    });
    return settingsSliders;
  }

  getButtons(props: SettingsButtonType[]): HTMLButtonElement[] {
    const settingsButtons = props.map((buttonProps) => {
      const button = document.createElement('button');
      button.classList.add('settings-page__btn');
      button.textContent = buttonProps.text;
      return button;
    });
    return settingsButtons;
  }

  getCheckboxLabels(props: SettingsCheckboxType[]): HTMLLabelElement[] {
    const settingsCheckboxes = props.map((checkboxProps) => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('settings-page__checkbox');
      checkbox.id = checkboxProps.id;

      const checkmark = document.createElement('span');
      checkmark.classList.add('settings-page__checkmark');

      const label = document.createElement('label');
      label.classList.add('settings-page__checkbox-label');
      label.htmlFor = checkbox.id;
      label.textContent = checkboxProps.text;

      label.prepend(checkbox, checkmark);
      return label;
    });

    return settingsCheckboxes;
  }

  async renderLogo() {
    const logo = document.createElement('div');
    logo.classList.add('settings-page__logo');
    this.container.append(logo);
  }

  renderWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('settings-page__wrapper');

    const inner = document.createElement('div');
    inner.classList.add('settings-page__inner');

    wrapper.append(inner);
    this.getRangeLabels(rangesProps).forEach((item) => inner.append(item));
    this.getCheckboxLabels(checkboxesProps).forEach((item) => inner.append(item));
    this.getButtons(buttonsProps).forEach((item) => inner.append(item));
    this.container.append(wrapper);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(SettingsPage.TextObject.mainTitle, 'h2', 'title');
    this.renderLogo();
    this.renderWrapper();
    this.container.append(title);
    return this.container;
  }
}

export default SettingsPage;
