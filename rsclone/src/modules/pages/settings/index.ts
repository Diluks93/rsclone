import Page from '../../core/templates/page';
import './style.scss';

const jsonUrl =
  'https://raw.githubusercontent.com/randomspells/source-rsclone/randomspells-source/rsclone-source/json/settings.json';
const getSettingsJson = async () => {
  try {
    const data = await fetch(jsonUrl);
    const json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

const rangesProps: Record<string, string>[] = [
  {
    iconUrl:
      'https://raw.githubusercontent.com/randomspells/source-rsclone/af3870fdc4d1d92e27d7603277d7c09b9710b449/rsclone-source/settings-page/svg/sound.svg',
    id: 'volume-bar',
    value: '60',
  },
];

const checkboxesProps: Record<string, string>[] = [
  {
    text: 'Вкл / откл звук',
    id: 'toggle-sound',
  },
  {
    text: 'Ограничение по времени',
    id: 'toggle-time',
  },
  {
    text: 'Отчет по пакостям',
    id: 'toggle-report',
  },
];

const btnsProps: Record<string, string>[] = [
  {
    text: 'Удалить прогресс игры',
    id: 'reset-progress',
  },
  {
    text: 'Отмена',
    id: 'cancel-settings',
  },
  {
    text: 'Ок',
    id: 'save-settings',
  },
];

class SettingsPage extends Page {
  static TextObject = {
    mainTitle: 'Настройки',
  };

  async renderLogo() {
    const logo = document.createElement('div');
    logo.classList.add('settings-page__logo');
    this.container.append(logo);
    const json = await getSettingsJson();
    console.log(json);
  }

  getRanges(props: Record<string, string>[]) {
    const settingsSliders = props.map((rangeProps) => {
      const range = document.createElement('input');
      range.type = 'range';
      range.id = rangeProps.id;
      range.classList.add('settings-page__range');

      const soundBtn = document.createElement('button');
      soundBtn.classList.add('settings-page__toggle-btn');
      soundBtn.style.backgroundImage = `url(${rangeProps.iconUrl})`;

      const label = document.createElement('label');
      label.classList.add('settings-page__range-label');
      label.append(soundBtn, range);
      return label;
    });
    return settingsSliders;
  }

  getBtns(props: Record<string, string>[]) {
    const settingsBtns = props.map((btnProps) => {
      const btn = document.createElement('button');
      btn.classList.add('settings-page__btn');
      btn.textContent = btnProps.text;
      return btn;
    });
    return settingsBtns;
  }

  getCheckboxes(props: Record<string, string>[]) {
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

  renderWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('settings-page__wrapper');
    const inner = document.createElement('div');
    inner.classList.add('settings-page__inner');
    wrapper.append(inner);
    this.getRanges(rangesProps).forEach((item) => inner.append(item));
    this.getCheckboxes(checkboxesProps).forEach((item) => inner.append(item));
    this.getBtns(btnsProps).forEach((item) => inner.append(item));
    this.container.append(wrapper);
  }

  render() {
    const title = this.createHeaderTitle(SettingsPage.TextObject.mainTitle, 'h2', 'title');
    this.renderLogo();
    this.renderWrapper();
    this.container.append(title);
    return this.container;
  }
}

export default SettingsPage;
