import { levelPreviewProps, levelLinkButtonProps } from './../../core/constants/constLevels';
import { levelDetailsProps } from '../../core/constants/constLevels';
import { levelPageTitleProps } from '../../core/constants/constLevels';
import Page from '../../core/templates/Page';

import { GameTranslationInterface, LanguageKeys, LevelPreviewType } from '../../core/types/types';
import './style.scss';
import SvgIcon from '../../core/components/SvgIcon';

const PAGE_NAME = 'levels-page';
const LEVEL_DETAILS = 'level-details';
const CURRENT_LEVEL = 0;
const CURRENT_SCORE = 0;
const TOTAL_SCORE = 5;

class LevelSelectPage extends Page {
  levelSelectLayout: HTMLDivElement;

  tutorialWrapper: HTMLDivElement;

  seasonOneWrapper: HTMLDivElement;

  levelDetailsWrapper: HTMLDivElement;

  tutorialTitle: HTMLElement;

  seasonOneTitle: HTMLElement;

  levelDetailslTitle: HTMLElement;

  scoreSpan: HTMLSpanElement;

  timeLimitSpan: HTMLSpanElement;

  hintSpan: HTMLSpanElement;

  previewImage: HTMLImageElement;

  levelDescriptionText: HTMLParagraphElement;

  playLevelButton: HTMLAnchorElement;

  constructor(id: string, className: string) {
    super(id, className);

    this.tutorialTitle = this.createHeaderTitle(levelPageTitleProps.tutorialTitle);
    this.seasonOneTitle = this.createHeaderTitle(levelPageTitleProps.seasonOneTitle);
    this.levelDetailslTitle = this.createHeaderTitle(levelPageTitleProps.levelDetailsTitle);
    this.scoreSpan = this.createScoreWrapper(levelDetailsProps.ratingCountId, 'star');
    this.timeLimitSpan = this.createInfoSpan(levelDetailsProps.timeLimitId, 'clock');
    this.hintSpan = this.createInfoSpan(levelDetailsProps.hintId, 'wink');
    //todo: change to better source of image
    this.previewImage = this.createPreviewImage(levelPreviewProps.tutorialTitle[0].imageUrl);
    this.levelDescriptionText = this.createLevelDescriptionText(levelDetailsProps.levelDescriptionId);
    this.playLevelButton = this.createLinkButton(levelLinkButtonProps.playLevelButton);

    this.tutorialWrapper = this.createLevelList(this.tutorialTitle);
    this.seasonOneWrapper = this.createLevelList(this.seasonOneTitle);
    this.levelDetailsWrapper = this.createLevelDetails();
    this.levelSelectLayout = this.createLevelSelectLayout();
  }

  createLevelList(title: HTMLElement): HTMLDivElement {
    const levelListWrapper = this.createWrapper(`${PAGE_NAME}__wrapper`);

    const levelPreviewWrapper = document.createElement('div');
    levelPreviewWrapper.classList.add(`${PAGE_NAME}__preview-box`);
    const levelPreviewButtons = levelPreviewProps[title.id].map((item) => {
      return this.createLevelPreviewButton(item);
    });

    levelListWrapper.append(title);
    levelPreviewWrapper.append(...levelPreviewButtons);
    levelListWrapper.append(levelPreviewWrapper);
    return levelListWrapper;
  }

  createLevelPreviewButton({ id, imageUrl, isLocked }: LevelPreviewType): HTMLButtonElement {
    const previewButton = document.createElement('button');
    previewButton.classList.add(`${PAGE_NAME}__preview`);
    previewButton.id = id;
    previewButton.style.backgroundImage = `url(${imageUrl})`;

    if (isLocked) {
      previewButton.classList.add('locked');
      previewButton.disabled = true;
    }

    return previewButton;
  }

  createPreviewImage(imageUrl: string): HTMLImageElement {
    const previewImage = document.createElement('img');
    previewImage.classList.add(`${LEVEL_DETAILS}__preview-image`);
    previewImage.src = imageUrl;
    return previewImage;
  }

  createInfoSpan(id: string, iconId: string): HTMLParagraphElement {
    const span = document.createElement('p');
    span.classList.add(`${LEVEL_DETAILS}__text`);
    span.id = id;

    span.prepend(new SvgIcon(iconId).render());

    return span;
  }

  createScoreWrapper(id: string, iconId: string): HTMLParagraphElement {
    const currentCount = this.createInfoSpan(id, iconId);
    currentCount.append(`${CURRENT_SCORE}/${TOTAL_SCORE}`);
    return currentCount;
  }

  createLevelDetails(): HTMLDivElement {
    const wrapper = this.createWrapper(LEVEL_DETAILS);

    const innerBlock = document.createElement('div');
    innerBlock.classList.add(`${LEVEL_DETAILS}__inner`);

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add(`${LEVEL_DETAILS}__info`);

    infoWrapper.append(this.timeLimitSpan, this.scoreSpan, this.hintSpan);
    innerBlock.append(this.previewImage, infoWrapper, this.levelDescriptionText);
    wrapper.append(this.levelDetailslTitle, innerBlock, this.playLevelButton);
    return wrapper;
  }

  createLevelDescriptionText(id: string): HTMLParagraphElement {
    const levelDescriptionText = document.createElement('div');
    levelDescriptionText.classList.add(`${LEVEL_DETAILS}__description`);
    levelDescriptionText.id = id;
    return levelDescriptionText;
  }

  createWrapper(className: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper', 'levels-page__wrapper', `${className}`);
    return wrapper;
  }

  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys) {
    this.backToMainButton.append(translation[lang].backToMainButton);
    this.tutorialTitle.textContent = translation[lang].tutorialTitle;
    this.seasonOneTitle.textContent = translation[lang].seasonOneTitle;
    this.levelDetailslTitle.textContent = translation[lang].levelDetailsBlock[CURRENT_LEVEL].levelTitle;
    this.timeLimitSpan.append(translation[lang].levelDetailsBlock[CURRENT_LEVEL].timeLimit);
    this.hintSpan.append(translation[lang].levelDetailsBlock[CURRENT_LEVEL].hintText);
    this.levelDescriptionText.textContent = translation[lang].levelDetailsBlock[CURRENT_LEVEL].levelDescriptionText;
    this.playLevelButton.append(translation[lang].playLevelButton);
  }

  createLevelSelectLayout(): HTMLDivElement {
    const layout = document.createElement('div');
    layout.classList.add(`${PAGE_NAME}__layout`);

    layout.append(this.tutorialWrapper, this.seasonOneWrapper, this.levelDetailsWrapper);

    return layout;
  }

  render() {
    this.container.append(this.backToMainButton, this.levelSelectLayout);
    return this.container;
  }
}

export default LevelSelectPage;
