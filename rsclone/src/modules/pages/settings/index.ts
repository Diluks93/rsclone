import { TEXT_NODE } from './../../core/constants/constSettings';
import {
  SettingsCheckboxType,
  SettingsSelectType,
  SettingsRangeType,
  LanguageKeys,
  GameTranslationInterface,
} from './../../core/types/types';
import {
  rangeProps,
  checkboxProps,
  selectProps,
  settingsLinkButtonProps,
  settingsTitleProps,
} from '../../core/constants/constSettings';
import Page from '../../core/templates/Page';
import './style.scss';
import SvgIcon from '../../core/components/svg-icon';
import { StorageKey } from '../../core/enums/enums';

const PAGE_NAME = 'settings-page';

class SettingsPage extends Page {
  settingsWrapper: HTMLDivElement;

  settingsTitle: HTMLElement;

  volumeRangeSlider: HTMLLabelElement;

  languageSelect: HTMLDivElement;

  soundCheckbox: HTMLLabelElement;

  timeLimitCheckbox: HTMLLabelElement;

  saveSettingsButton: HTMLAnchorElement;

  constructor(id: string, className: string) {
    super(id, className);
    this.settingsTitle = this.createHeaderTitle(settingsTitleProps);
    this.volumeRangeSlider = this.createRangeSlider(rangeProps);
    this.languageSelect = this.createLanguageSelect(selectProps);
    this.soundCheckbox = this.createCheckbox(checkboxProps.soundCheckbox);
    this.timeLimitCheckbox = this.createCheckbox(checkboxProps.timeLimitCheckbox);
    this.saveSettingsButton = this.createLinkButton(settingsLinkButtonProps.saveButton);
    this.settingsWrapper = this.createWrapper('wrapper');
  }

  createRangeSlider({ id, min, max, step, value, inputHandler }: SettingsRangeType): HTMLLabelElement {
    const range = document.createElement('input');
    const storageValue = localStorage.getItem(StorageKey.SoundVolume);
    range.type = 'range';
    range.id = id;
    range.min = min;
    range.max = max;
    range.step = step;
    range.value = storageValue || value;
    range.classList.add(`${PAGE_NAME}__range`);

    const soundButton = document.createElement('button');
    soundButton.classList.add(`${PAGE_NAME}__toggle-button`);
    soundButton.append(new SvgIcon('sound').render());

    const label = document.createElement('label');
    label.classList.add(`${PAGE_NAME}__range-label`);
    label.append(soundButton, range);

    if (storageValue) {
      range.style.backgroundImage = `
			-webkit-gradient(linear, left top, right top,
			color-stop(${storageValue}, #ff6633),
			color-stop(${storageValue}, #fff))
		`;
    }

    range.addEventListener('input', inputHandler);

    return label;
  }

  createLanguageSelect(props: SettingsSelectType): HTMLDivElement {
    const { id, options, changeHandler } = props;
    const customSelect = document.createElement('div');
    customSelect.classList.add(`${PAGE_NAME}__custom-select`, 'basic-hover');
    const select = document.createElement('select');
    select.classList.add(`${PAGE_NAME}__select`);
    select.id = id;

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.append(optionElement);
    });

    select.addEventListener('change', (e) => {
      changeHandler(e, this);
    });

    customSelect.append(select);

    return customSelect;
  }

  createCheckbox({ id, isEnabled, text, clickHandler }: SettingsCheckboxType): HTMLLabelElement {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add(`${PAGE_NAME}__checkbox`);
    checkbox.id = id;
    checkbox.checked = isEnabled;
    checkbox.onclick = clickHandler;

    const checkmark = document.createElement('span');
    checkmark.classList.add(`${PAGE_NAME}__checkmark`);

    const label = document.createElement('label');
    label.classList.add(`${PAGE_NAME}__checkbox-label`);
    label.htmlFor = checkbox.id;
    label.textContent = text;

    label.prepend(checkbox, checkmark);
    return label;
  }

  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys): void {
    this.settingsTitle.textContent = translation[lang].settingsTitle;
    const selectLabelFirstChild = this.languageSelect.firstElementChild;
    if (selectLabelFirstChild instanceof HTMLSelectElement) {
      selectLabelFirstChild.value = lang;
    }

    const soundLastChild = this.soundCheckbox.lastChild;
    if (soundLastChild?.nodeType === TEXT_NODE) {
      soundLastChild.textContent = translation[lang].isSoundEnabledLabel;
    }

    const timeLimitLastChild = this.timeLimitCheckbox.lastChild;
    if (timeLimitLastChild?.nodeType === TEXT_NODE) {
      timeLimitLastChild.textContent = translation[lang].isTimeLimitEnabledLabel;
    }

    if (this.saveSettingsButton.lastChild) {
      this.saveSettingsButton.lastChild.textContent = translation[lang].saveSettingsButton;
    }

    this.backToMainButton.textContent = translation[lang].backToMainButton;
  }

  createWrapper(className: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(className);

    wrapper.append(this.settingsTitle);
    wrapper.append(this.languageSelect);
    wrapper.append(this.volumeRangeSlider);
    wrapper.append(this.soundCheckbox);
    wrapper.append(this.timeLimitCheckbox);
    wrapper.append(this.saveSettingsButton);

    return wrapper;
  }

  updateSettings(): void {
    const soundCheckedStorage = JSON.parse(localStorage.getItem(StorageKey.SoundCheckbox) as string);
    const soundTimeLimitStorage = JSON.parse(localStorage.getItem(StorageKey.TimeLimitCheckbox) as string);

    if (soundCheckedStorage !== null) {
      (this.soundCheckbox.firstChild as HTMLInputElement).checked = JSON.parse(
        localStorage.getItem(StorageKey.SoundCheckbox) as string
      );
    }
    if (soundTimeLimitStorage !== null) {
      (this.timeLimitCheckbox.firstChild as HTMLInputElement).checked = JSON.parse(
        localStorage.getItem(StorageKey.TimeLimitCheckbox) as string
      );
    }
  }

  render(): HTMLElement {
    this.container.append(this.backToMainButton);
    this.container.append(this.settingsWrapper);
    this.updateSettings();
    return this.container;
  }
}

export default SettingsPage;
