import { settingsStore } from './../../core/stores/settingsStore';
import { levelPreviewProps, levelLinkButtonProps } from './../../core/constants/constLevels';
import { levelDetailsProps } from '../../core/constants/constLevels';
import { levelPageTitleProps } from '../../core/constants/constLevels';
import Page from '../../core/templates/Page';
import gameTranslation from '../../core/data/gameTranslation.json';
import { GameTranslationInterface, LanguageKeys, LevelPreviewType } from '../../core/types/types';
import './style.scss';
import SvgIcon from '../../core/components/svg-icon';
import levelExample from '../../../assets/image/level/level-example.png';
import { turnOnBackgroundMusic } from '../../core/utils/utils';
import { backgroundMusic } from '../../core/constants/constAudio';

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
    this.playLevelButton.addEventListener('click', (e: MouseEvent) => {
      turnOnBackgroundMusic(backgroundMusic, e);
      const canvasParent = document.getElementById('first-step');
      canvasParent?.classList.remove('hidden');
    });
    this.tutorialWrapper = this.createLevelList(this.tutorialTitle);
    this.seasonOneWrapper = this.createLevelList(this.seasonOneTitle);
    this.levelDetailsWrapper = this.createLevelDetails();
    this.levelSelectLayout = this.createLevelSelectLayout();
  }

  createLevelList(title: HTMLElement): HTMLDivElement {
    const levelListWrapper = this.createWrapper(`${PAGE_NAME}__wrapper`);

    const levelPreviewWrapper = document.createElement('div');
    levelPreviewWrapper.classList.add(`${PAGE_NAME}__preview-box`);
    const levelPreviewButtons = levelPreviewProps[title.id].map((item, index) => {
      return this.createLevelPreviewButton(item, index);
    });

    levelListWrapper.append(title);
    levelPreviewWrapper.append(...levelPreviewButtons);
    levelListWrapper.append(levelPreviewWrapper);
    return levelListWrapper;
  }

  createLevelPreviewButton({ id, isLocked }: LevelPreviewType, index: number): HTMLButtonElement {
    const previewButton = document.createElement('button');
    previewButton.classList.add(`${PAGE_NAME}__preview`);
    previewButton.id = id;
    previewButton.style.backgroundImage = `url(${levelExample})`;
    previewButton.dataset.index = String(index);

    if (isLocked) {
      previewButton.classList.add('locked');
      previewButton.disabled = true;
    }
    previewButton.addEventListener('click', (e) => {
      if (!e.target) return;
      if (e.target instanceof HTMLButtonElement) {
        const levelIndex = Number(e.target.dataset.index);
        console.log(levelIndex);
        this.setDescriptionLanguage(gameTranslation, settingsStore.languageValue, levelIndex);
      }
    });

    return previewButton;
  }

  createPreviewImage(imageUrl: string): HTMLImageElement {
    const previewImage = document.createElement('img');
    previewImage.classList.add(`${LEVEL_DETAILS}__preview-image`);
    previewImage.src = levelExample;
    return previewImage;
  }

  createInfoSpan(id: string, iconId: string): HTMLParagraphElement {
    const paragraph = document.createElement('p');
    paragraph.id = id;
    paragraph.classList.add(`${LEVEL_DETAILS}__text`);

    paragraph.prepend(new SvgIcon(iconId).render());

    const textSpan = document.createElement('span');
    paragraph.append(textSpan);
    return paragraph;
  }

  createScoreWrapper(id: string, iconId: string): HTMLSpanElement {
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
    const levelDescriptionText = document.createElement('p');
    levelDescriptionText.classList.add(`${LEVEL_DETAILS}__description`);
    levelDescriptionText.id = id;
    return levelDescriptionText;
  }

  createWrapper(className: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper', 'levels-page__wrapper', `${className}`);
    return wrapper;
  }

  setPageLanguage(translation: GameTranslationInterface, lang: LanguageKeys): void {
    this.backToMainButton.append(translation[lang].backToMainButton);
    this.tutorialTitle.textContent = translation[lang].tutorialTitle;
    this.seasonOneTitle.textContent = translation[lang].seasonOneTitle;
    this.playLevelButton.append(translation[lang].playLevelButton);
    this.setDescriptionLanguage(translation, lang, CURRENT_LEVEL);
  }

  setDescriptionLanguage(translation: GameTranslationInterface, lang: LanguageKeys, levelIndex: number): void {
    const timeSpan = this.timeLimitSpan.querySelector('span');
    const hintSpan = this.hintSpan.querySelector('span');
    if (timeSpan && hintSpan) {
      timeSpan.textContent = translation[lang].levelDetailsBlock[levelIndex].timeLimit;
      hintSpan.textContent = translation[lang].levelDetailsBlock[levelIndex].hintText;
    }
    this.levelDetailslTitle.textContent = translation[lang].levelDetailsBlock[levelIndex].levelTitle;
    this.levelDescriptionText.textContent = translation[lang].levelDetailsBlock[levelIndex].levelDescriptionText;
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
