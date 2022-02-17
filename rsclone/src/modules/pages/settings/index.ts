import { IconId } from './../../core/enums/enums';
import Page from '../../core/templates/Page';
import SvgIcon from '../../core/components/svg-icon';

import { settingsStore } from './../../core/stores/settingsStore';
import { volumeBarId } from './../../core/constants/constSettings';
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

class SettingsPage extends Page {
  settingsWrapper: HTMLDivElement;

  settingsTitle: HTMLElement;

  volumeRangeSliderSound: HTMLLabelElement;

  volumeRangeSliderBackgroundMusic: HTMLLabelElement;

  languageSelect: HTMLDivElement;

  soundCheckbox: HTMLLabelElement;

  timeLimitCheckbox: HTMLLabelElement;

  saveSettingsButton: HTMLAnchorElement;

  constructor(id: string, className: string) {
    super(id, className);
    this.settingsTitle = this.createHeaderTitle(settingsTitleProps);
    this.volumeRangeSliderSound = this.createRangeSlider(rangeProps, volumeBarId.volumeBarSound);
    this.volumeRangeSliderBackgroundMusic = this.createRangeSlider(rangeProps, volumeBarId.volumeBarBackgroundMusic);
    this.languageSelect = this.createLanguageSelect(selectProps);
    this.soundCheckbox = this.createCheckbox(checkboxProps.soundCheckbox);
    this.timeLimitCheckbox = this.createCheckbox(checkboxProps.timeLimitCheckbox);
    this.saveSettingsButton = this.createLinkButton(settingsLinkButtonProps.saveButton);
    this.settingsWrapper = this.createWrapper('wrapper');
  }

  createRangeSlider({ min, max, step, value, inputHandler }: SettingsRangeType, id: string): HTMLLabelElement {
    const range = document.createElement('input');
    let musicVolume: string | null;

    if (id === volumeBarId.volumeBarSound) {
      musicVolume = localStorage.getItem(StorageKey.SoundVolume);
    } else {
      musicVolume = localStorage.getItem(StorageKey.BackgroundMusicVolume);
    }

    range.type = 'range';
    range.id = id;
    range.min = min;
    range.max = max;
    range.step = step;
    range.value = musicVolume || value;
    range.classList.add(`${PageId.SettingsPage}__range`);

    const soundButton = document.createElement('button');
    soundButton.classList.add(`${PageId.SettingsPage}__toggle-button`);
    soundButton.append(new SvgIcon(IconId.Volume).render());

    const rangeTitle = document.createElement('div');
    rangeTitle.classList.add(`${PageId.SettingsPage}__range-title`);

    const label = document.createElement('label');
    label.classList.add(`${PageId.SettingsPage}__range-label`);
    label.append(soundButton, range, rangeTitle);

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
    selectWrapper.classList.add(`${PageId.SettingsPage}__custom-select`);

    const selectCurrentWrapper = document.createElement('div');
    selectCurrentWrapper.classList.add(`${PageId.SettingsPage}__current-wrapper`, 'basic-hover');
    const selectCurrentOption = document.createElement('span');

    const currentLanguage = settingsStore.languageValue;
    selectCurrentOption.textContent = currentLanguage;
    selectCurrentWrapper.append(selectCurrentOption);
    selectCurrentWrapper.append(new SvgIcon(iconId).render());

    const selectOptionsWrapper = document.createElement('div');
    selectOptionsWrapper.classList.add(`${PageId.SettingsPage}__options-wrapper`, 'hidden');
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
    checkbox.classList.add(`${PageId.SettingsPage}__checkbox`);
    checkbox.id = id;
    checkbox.checked = isEnabled;
    checkbox.onclick = clickHandler;

    const checkmark = document.createElement('span');
    checkmark.classList.add(`${PageId.SettingsPage}__checkmark`);

    const label = document.createElement('label');
    label.classList.add(`${PageId.SettingsPage}__checkbox-label`);
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

    const textNode = 3;
    const soundLastChild = this.soundCheckbox.lastChild;
    if (soundLastChild?.nodeType === textNode) {
      soundLastChild.textContent = translation[lang].isSoundEnabledLabel;
    }

    const timeLimitLastChild = this.timeLimitCheckbox.lastChild;
    if (timeLimitLastChild?.nodeType === textNode) {
      timeLimitLastChild.textContent = translation[lang].isTimeLimitEnabledLabel;
    }

    if (this.saveSettingsButton.lastChild) {
      this.saveSettingsButton.lastChild.textContent = translation[lang].saveSettingsButton;
    }

    this.backToMainButton.textContent = translation[lang].backToMainButton;
    this.backToMainButton.prepend(new SvgIcon(IconId.ArrowLeft).render());

    const volumeRangeSoundLastChild = this.volumeRangeSliderSound.lastChild;
    if (volumeRangeSoundLastChild instanceof HTMLDivElement) {
      volumeRangeSoundLastChild.textContent = translation[lang].soundTitle;
    }

    const volumeRangeBackgroundMusicLastChild = this.volumeRangeSliderBackgroundMusic.lastChild;
    if (volumeRangeBackgroundMusicLastChild instanceof HTMLDivElement) {
      volumeRangeBackgroundMusicLastChild.textContent = translation[lang].musicTitle;
    }
  }

  createWrapper(className: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(className);

    wrapper.append(this.settingsTitle);
    wrapper.append(this.languageSelect);
    wrapper.append(this.volumeRangeSliderBackgroundMusic);
    wrapper.append(this.volumeRangeSliderSound);
    wrapper.append(this.soundCheckbox);
    wrapper.append(this.timeLimitCheckbox);
    wrapper.append(this.saveSettingsButton);

    return wrapper;
  }

  updateSettings(): void {
    const backgroundMusicCheckboxStorage: boolean = JSON.parse(
      localStorage.getItem(StorageKey.SoundCheckbox) as string
    );
    const soundTimeLimitStorage: boolean = JSON.parse(localStorage.getItem(StorageKey.TimeLimitCheckbox) as string);

    if (backgroundMusicCheckboxStorage !== null) {
      (this.soundCheckbox.firstChild as HTMLInputElement).checked = backgroundMusicCheckboxStorage;
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
