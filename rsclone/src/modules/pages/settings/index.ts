import { linkButtonsProps } from './../../core/constants/constSettings';
import { SettingsCheckboxType, SettingsLinkButtonType, SettingsSelectType } from './../../core/types/settingsTypes';
import { rangesProps, checkboxesProps, buttonsProps, selectProps } from '../../core/constants/constSettings';
import { SettingsButtonType, SettingsRangeType } from '../../core/types/settingsTypes';
import Page from '../../core/templates/page';
import './style.scss';
import { settingsStore } from '../../core/stores/settingsStore';

const titleUrlRu = 'https://raw.githubusercontent.com/Diluks93/source-rsclone/new-files/rsclone-source/title/ru.webp';

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
    customSelect.classList.add('settings-page__custom-select');
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

  getButtons(props: SettingsButtonType[]): HTMLButtonElement[] {
    const settingsButtons = props.map((buttonProps) => {
      const button = document.createElement('button');
      button.classList.add('settings-page__btn');
      button.id = buttonProps.id;
      button.textContent = buttonProps.text;
      return button;
    });
    return settingsButtons;
  }

  getLinkButtons(props: SettingsLinkButtonType[]): HTMLAnchorElement[] {
    const settingsLinkButtons = props.map((buttonProps) => {
      const link = document.createElement('a');
      link.classList.add('settings-page__btn');
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

  async renderTitle() {
    const title = document.createElement('div');
    title.classList.add('settings-page__title');
    title.style.backgroundImage = `url(${titleUrlRu})`;
    this.container.append(title);
  }

  renderWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('settings-page__wrapper');

    const inner = document.createElement('div');
    inner.classList.add('settings-page__inner');

    wrapper.append(inner);
    inner.append(this.getCustomSelect(selectProps));
    this.getRangeLabels(rangesProps).forEach((item) => inner.append(item));
    this.getCheckboxLabels(checkboxesProps).forEach((item) => inner.append(item));
    this.getButtons(buttonsProps).forEach((item) => inner.append(item));
    this.getLinkButtons(linkButtonsProps).forEach((item) => inner.append(item));
    this.container.append(wrapper);
  }

  render(): HTMLElement {
    this.renderTitle();
    this.renderWrapper();
    return this.container;
  }
}

// todo: move to app component or events controller
window.onload = () => {
  settingsStore.setSettingsLanguage();
};

export default SettingsPage;
