import { authorsTitleProps, authorButtonProps } from './../../core/constants/constAuthors';
import Page from '../../core/templates/Page';
import './style.scss';
import { GameTranslationInterface, LanguageKeys, LinkButtonType } from '../../core/types/types';

const PAGE_NAME = 'authors-page';

class AuthorsPage extends Page {
  authorButtonsWrapper: HTMLDivElement;

  authorsTitle: HTMLElement;

  diluksAuthorButton: HTMLDivElement;

  jenyaAuthorButton: HTMLDivElement;

  randomspellsAuthorButton: HTMLDivElement;

  constructor(id: string, className: string) {
    super(id, className);
    this.authorsTitle = this.createHeaderTitle(authorsTitleProps);
    this.diluksAuthorButton = this.createAuthorButton(authorButtonProps.diluksAuthorButton);
    this.jenyaAuthorButton = this.createAuthorButton(authorButtonProps.jenyaAuthorButton);
    this.randomspellsAuthorButton = this.createAuthorButton(authorButtonProps.randomspellsAuthorButton);
    this.authorButtonsWrapper = this.createWrapper('wrapper');
  }

  createAuthorButton({ id, href, subTitle }: LinkButtonType): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(`${PAGE_NAME}__wrapper`, `${PAGE_NAME}__wrapper--${id.toLowerCase()}`);

    const inner = document.createElement('div');
    inner.className = `${PAGE_NAME}__inner`;

    const subtitle = document.createElement('span');
    subtitle.className = `${PAGE_NAME}__subtitle`;
    if (subTitle) {
      subtitle.textContent = subTitle;
    }
    subtitle.id = id;

    const link = document.createElement('a');
    link.classList.add('primary-button', `${PAGE_NAME}__button`, 'basic-hover');
    link.textContent = id;
    link.href = href;

    inner.append(link);
    inner.append(subtitle);
    wrapper.append(inner);

    return wrapper;
  }

  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys) {
    this.authorsTitle.textContent = translation[lang].authorsTitle;

    const diluksSubtitle = this.diluksAuthorButton.firstElementChild?.lastChild;
    if (diluksSubtitle instanceof HTMLSpanElement) {
      diluksSubtitle.textContent = translation[lang].diluksSubtitle;
    }

    const jenyabSubtitle = this.jenyaAuthorButton.firstElementChild?.lastChild;
    if (jenyabSubtitle instanceof HTMLSpanElement) {
      jenyabSubtitle.textContent = translation[lang].jenyaSubtitle;
    }

    const randomspellsSubtitle = this.randomspellsAuthorButton.firstElementChild?.lastChild;
    if (randomspellsSubtitle instanceof HTMLSpanElement) {
      randomspellsSubtitle.textContent = translation[lang].randomspellsSubtitle;
    }

    this.backToMainButton.textContent = translation[lang].backToMainButton;
  }

  createWrapper(className: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(className);

    wrapper.append(this.authorsTitle);
    wrapper.append(this.diluksAuthorButton);
    wrapper.append(this.jenyaAuthorButton);
    wrapper.append(this.randomspellsAuthorButton);

    return wrapper;
  }

  render() {
    this.container.append(this.backToMainButton);
    this.container.append(this.authorButtonsWrapper);
    return this.container;
  }
}

export default AuthorsPage;
