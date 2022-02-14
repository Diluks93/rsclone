import Page from '../../core/templates/Page';
import SvgIcon from '../../core/components/svg-icon';

import { settingsStore } from './../../core/stores/settingsStore';
import { TEXT_NODE } from './../../core/constants/constSettings';
import { PageId, StorageKey } from '../../core/enums/enums';
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
import './style.scss';

const PAGE_NAME = PageId.SettingsPage;

class SettingsPage extends Page {
  settingsWrapper: HTMLDivElement;

  settingsTitle: HTMLElement;

  volumeRangeSliderMainPage: HTMLLabelElement;

  volumeRangeSliderGame: HTMLLabelElement;

  languageSelect: HTMLDivElement;

  soundCheckbox: HTMLLabelElement;

  timeLimitCheckbox: HTMLLabelElement;

  saveSettingsButton: HTMLAnchorElement;

  constructor(id: string, className: string) {
    super(id, className);
    this.settingsTitle = this.createHeaderTitle(settingsTitleProps);
    this.volumeRangeSliderMainPage = this.createRangeSlider(rangeProps);
    this.volumeRangeSliderGame = this.createRangeSlider(rangeProps);
    this.languageSelect = this.createLanguageSelect(selectProps);
    this.soundCheckbox = this.createCheckbox(checkboxProps.soundCheckbox);
    this.timeLimitCheckbox = this.createCheckbox(checkboxProps.timeLimitCheckbox);
    this.saveSettingsButton = this.createLinkButton(settingsLinkButtonProps.saveButton);
    this.settingsWrapper = this.createWrapper('wrapper');
  }

  createRangeSlider({ id, min, max, step, value, inputHandler }: SettingsRangeType): HTMLLabelElement {
    const range = document.createElement('input');
    const musicVolume = localStorage.getItem(StorageKey.SoundVolumeMenu);
    range.type = 'range';
    range.id = id;
    range.min = min;
    range.max = max;
    range.step = step;
    range.value = musicVolume || value;
    range.classList.add(`${PAGE_NAME}__range`);

    const soundButton = document.createElement('button');
    soundButton.classList.add(`${PAGE_NAME}__toggle-button`);
    soundButton.append(new SvgIcon('sound').render());

    const label = document.createElement('label');
    label.classList.add(`${PAGE_NAME}__range-label`);
    label.append(soundButton, range);

    if (musicVolume) {
      range.style.backgroundImage = `
				-webkit-gradient(linear, left top, right top,
				color-stop(${musicVolume}, #ff6633),
				color-stop(${musicVolume}, #fff))
			`;
    }

    range.addEventListener('input', inputHandler);

    return label;
  }

  createLanguageSelect(props: SettingsSelectType): HTMLDivElement {
    const { options, iconId, changeHandler } = props;

    const selectWrapper = document.createElement('div');
    selectWrapper.classList.add(`${PAGE_NAME}__custom-select`);

    const selectCurrentWrapper = document.createElement('div');
    selectCurrentWrapper.classList.add(`${PAGE_NAME}__current-wrapper`, 'basic-hover');
    const selectCurrentOption = document.createElement('span');

    const currentLanguage = settingsStore.languageValue;
    selectCurrentOption.textContent = currentLanguage;
    selectCurrentWrapper.append(selectCurrentOption);
    selectCurrentWrapper.append(new SvgIcon(iconId).render());

    const selectOptionsWrapper = document.createElement('div');
    selectOptionsWrapper.classList.add(`${PAGE_NAME}__options-wrapper`, 'hidden');
    options.forEach((option) => {
      const radioWrapper = document.createElement('div');
      radioWrapper.classList.add('basic-hover');
      const radioButton = document.createElement('input');
      if (currentLanguage === option) {
        radioButton.checked = true;
      }
      radioButton.type = 'radio';
      radioButton.name = 'lang';
      radioButton.value = option;
      radioButton.id = option;
      radioButton.addEventListener('click', (e) => {
        selectOptionsWrapper.classList.add('hidden');
        selectCurrentWrapper.classList.remove('expanded');
        changeHandler(e, this);
      });
      const radioLabel = document.createElement('label');
      radioLabel.textContent = option;
      radioLabel.htmlFor = option;
      radioWrapper.append(radioLabel, radioButton);
      selectOptionsWrapper.append(radioWrapper);
    });

    selectCurrentWrapper.addEventListener('click', () => {
      selectCurrentWrapper.classList.toggle('expanded');
      selectOptionsWrapper.classList.toggle('hidden');
    });

    selectWrapper.append(selectCurrentWrapper, selectOptionsWrapper);

    return selectWrapper;
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
    const selectCurrentOption = this.languageSelect.firstElementChild?.firstElementChild;
    if (selectCurrentOption instanceof HTMLSpanElement) {
      selectCurrentOption.textContent = lang;
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
    wrapper.append(this.volumeRangeSliderMainPage);
    wrapper.append(this.volumeRangeSliderGame);
    wrapper.append(this.soundCheckbox);
    wrapper.append(this.timeLimitCheckbox);
    wrapper.append(this.saveSettingsButton);

    return wrapper;
  }

  updateSettings(): void {
    const soundCheckedStorage: boolean = JSON.parse(localStorage.getItem(StorageKey.SoundCheckbox) as string);
    const soundTimeLimitStorage: boolean = JSON.parse(localStorage.getItem(StorageKey.TimeLimitCheckbox) as string);

    if (soundCheckedStorage !== null) {
      (this.soundCheckbox.firstChild as HTMLInputElement).checked = soundCheckedStorage;
    }
    if (soundTimeLimitStorage !== null) {
      (this.timeLimitCheckbox.firstChild as HTMLInputElement).checked = soundTimeLimitStorage;
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
