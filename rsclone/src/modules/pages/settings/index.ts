import {
  SettingsCheckboxType,
  SettingsLinkButtonType,
  SettingsSelectType,
  SettingsRangeType,
  TitleType,
} from './../../core/types/types';
import {
  rangesProps,
  checkboxesProps,
  selectProps,
  linkButtonsProps,
  titleProps,
} from '../../core/constants/constSettings';
import Page from '../../core/templates/page';
import { settingsStore } from '../../core/stores/settingsStore';
import gameTranslation from '../../core/data/gameTranslation.json';
import './style.scss';

class SettingsPage extends Page {
  getRangeLabels(props: SettingsRangeType[]): HTMLLabelElement[] {
    const settingsSliders = props.map(({ id, min, max, step, value, iconUrl, inputHandler }) => {
      const range = document.createElement('input');
      range.type = 'range';
      range.id = id;
      range.min = min;
      range.max = max;
      range.step = step;
      range.value = value;
      range.classList.add('settings-page__range');

      const soundButton = document.createElement('button');
      soundButton.classList.add('settings-page__toggle-btn');
      soundButton.style.backgroundImage = `url(${iconUrl})`;

      const label = document.createElement('label');
      label.classList.add('settings-page__range-label');
      label.append(soundButton, range);

      range.addEventListener('input', inputHandler);

      return label;
    });
    return settingsSliders;
  }

  getCustomSelect(props: SettingsSelectType): HTMLDivElement {
    const { id, options, changeHandler } = props;
    const customSelect = document.createElement('div');
    customSelect.classList.add('settings-page__custom-select', 'basic-hover');
    const select = document.createElement('select');
    select.classList.add('settings-page__select');
    select.id = id;

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.append(optionElement);
    });

    select.addEventListener('change', changeHandler);

    customSelect.append(select);

    return customSelect;
  }

  getLinkButtons(props: SettingsLinkButtonType[]): HTMLAnchorElement[] {
    const settingsLinkButtons = props.map((buttonProps) => {
      const link = document.createElement('a');
      link.classList.add('settings-page__btn', `settings-page__btn--${buttonProps.className}`, 'basic-hover');
      link.id = buttonProps.id;
      link.textContent = buttonProps.text;
      link.href = buttonProps.href;
      return link;
    });
    return settingsLinkButtons;
  }

  getCheckboxLabels(props: SettingsCheckboxType[]): HTMLLabelElement[] {
    const settingsCheckboxes = props.map((checkboxProps) => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('settings-page__checkbox');
      checkbox.id = checkboxProps.id;
      checkbox.checked = checkboxProps.isEnabled;
      checkbox.onclick = checkboxProps.clickHandler;

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

  getSettingsTitle({ id, text }: TitleType): HTMLHeadingElement {
    const title = document.createElement('h2');
    title.classList.add('settings-page__title');
    title.id = id;
    title.textContent = text;
    return title;
  }

  renderWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('settings-page__wrapper');

    wrapper.append(this.getSettingsTitle(titleProps));
    wrapper.append(this.getCustomSelect(selectProps));
    this.getRangeLabels(rangesProps).forEach((item) => wrapper.append(item));
    this.getCheckboxLabels(checkboxesProps).forEach((item) => wrapper.append(item));
    wrapper.append(this.getLinkButtons(linkButtonsProps)[1]);

    this.container.append(this.getLinkButtons(linkButtonsProps)[0]);
    this.container.append(wrapper);
  }

  render(): HTMLElement {
    this.renderWrapper();
    return this.container;
  }
}

// todo: move to app component or events controller
window.onload = () => {
  settingsStore.setSettingsLanguage(gameTranslation);
};

export default SettingsPage;
