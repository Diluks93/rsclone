import { SettingsCheckboxType, SettingsSelectType, SettingsRangeType } from './../../core/types/types';
import {
  rangesProps,
  checkboxesProps,
  selectProps,
  settingsLinkButtonsProps,
  settingsTitleProps,
} from '../../core/constants/constSettings';
import Page from '../../core/templates/Page';
import { settingsStore } from '../../core/stores/settingsStore';
import gameTranslation from '../../core/data/gameTranslation.json';
import './style.scss';

class SettingsPage extends Page {
  createRangeLabels(props: SettingsRangeType[]): HTMLLabelElement[] {
    const settingsSliders = props.map(({ id, min, max, step, value, inputHandler }) => {
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

      const label = document.createElement('label');
      label.classList.add('settings-page__range-label');
      label.append(soundButton, range);

      range.addEventListener('input', inputHandler);

      return label;
    });
    return settingsSliders;
  }

  createCustomSelect(props: SettingsSelectType): HTMLDivElement {
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

  createCheckboxLabels(props: SettingsCheckboxType[]): HTMLLabelElement[] {
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

  renderWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    wrapper.append(this.createHeaderTitle(settingsTitleProps));
    wrapper.append(this.createCustomSelect(selectProps));
    this.createRangeLabels(rangesProps).forEach((item) => wrapper.append(item));
    this.createCheckboxLabels(checkboxesProps).forEach((item) => wrapper.append(item));
    wrapper.append(this.createLinkButtons(settingsLinkButtonsProps)[0]);

    this.container.append(wrapper);
  }

  render(): HTMLElement {
    this.renderBackBtn();
    this.renderWrapper();
    return this.container;
  }
}

// todo: move to app component or events controller
window.onload = () => {
  settingsStore.setSettingsLanguage(gameTranslation);
};

export default SettingsPage;
