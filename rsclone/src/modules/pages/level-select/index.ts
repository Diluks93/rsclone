import Page from '../../core/templates/Page';
import SvgIcon from '../../core/components/svg-icon';
import gameTranslation from '../../core/data/gameTranslation.json';

import { settingsStore } from './../../core/stores/settingsStore';
import {
  levelPreviewProps,
  levelLinkButtonProps,
  levelDetailsProps,
  levelPageTitleProps,
} from './../../core/constants/constLevels';
import { GameTranslationInterface, LanguageKeys, LevelPreviewType } from '../../core/types/types';
import { turnOnBackgroundMusic } from '../../core/utils/utils';
import { backgroundMusic } from '../../core/constants/constAudio';
import { AssetUrl, GameKey, PageId } from '../../core/enums/enums';
import './style.scss';

class LevelSelectPage extends Page {
  levelSelectLayout: HTMLDivElement;

  tutorialWrapper: HTMLDivElement;

  seasonOneWrapper: HTMLDivElement;

  levelDetailsWrapper: HTMLDivElement;

  tutorialTitle: HTMLElement;

  seasonOneTitle: HTMLElement;

  levelDetailsTitle: HTMLElement;

  scoreParagraph: HTMLParagraphElement;

  timeLimitParagraph: HTMLParagraphElement;

  hintParagraph: HTMLParagraphElement;

  previewImage: HTMLImageElement;

  levelDescriptionText: HTMLParagraphElement;

  playLevelButton: HTMLAnchorElement;

  levelDetailsBaseClass = 'level-details';

  levelImageUrls = Object.values(AssetUrl).filter((url) => url.includes('level'));

  constructor(id: string, className: string) {
    super(id, className);
    this.tutorialTitle = this.createHeaderTitle(levelPageTitleProps.tutorialTitle);
    this.seasonOneTitle = this.createHeaderTitle(levelPageTitleProps.seasonOneTitle);
    this.levelDetailsTitle = this.createHeaderTitle(levelPageTitleProps.levelDetailsTitle);
    this.scoreParagraph = this.createScoreWrapper(levelDetailsProps.ratingCountId, 'star');
    this.timeLimitParagraph = this.createInfoParagraph(levelDetailsProps.timeLimitId, 'clock');
    this.hintParagraph = this.createInfoParagraph(levelDetailsProps.hintId, 'wink');
    this.previewImage = this.createPreviewImage(this.createPreviewUrl(this.levelImageUrls[settingsStore.currentLevel]));
    this.levelDescriptionText = this.createLevelDescriptionText(levelDetailsProps.levelDescriptionId);
    this.playLevelButton = this.createLinkButton(levelLinkButtonProps.playLevelButton);
    this.playLevelButton.addEventListener('click', (e: MouseEvent) => {
      turnOnBackgroundMusic(backgroundMusic, e);
      const canvasParent = document.getElementById(GameKey.CanvasParent);
      canvasParent?.classList.remove('hidden');
    });
    this.tutorialWrapper = this.createLevelList(this.tutorialTitle);
    this.seasonOneWrapper = this.createLevelList(this.seasonOneTitle);
    this.levelDetailsWrapper = this.createLevelDetails();
    this.levelSelectLayout = this.createLevelSelectLayout();
  }

  createLevelList(title: HTMLElement): HTMLDivElement {
    const levelListWrapper = this.createWrapper(`${PageId.LevelSelectPage}__wrapper`);

    const levelPreviewWrapper = document.createElement('div');
    levelPreviewWrapper.classList.add(`${PageId.LevelSelectPage}__preview-box`);
    const levelPreviewButtons = levelPreviewProps[title.id].map((item) => {
      return this.createLevelPreviewButton(item);
    });

    levelListWrapper.append(title);
    levelPreviewWrapper.append(...levelPreviewButtons);
    levelListWrapper.append(levelPreviewWrapper);
    return levelListWrapper;
  }

  createPreviewUrl(imageUrl: string): string {
    if (imageUrl) {
      return `${AssetUrl.Main}/${imageUrl}`;
    } else {
      return `${AssetUrl.Main}/${AssetUrl.LevelExample}`;
    }
  }

  createLevelPreviewButton({ id }: LevelPreviewType): HTMLButtonElement {
    const previewButton = document.createElement('button');
    const { currentLevel } = settingsStore;
    previewButton.classList.add(`${PageId.LevelSelectPage}__preview`);
    previewButton.id = String(id);

    previewButton.style.backgroundImage = `url(${this.createPreviewUrl(this.levelImageUrls[id])})`;

    if (currentLevel === Number(id)) {
      previewButton.classList.add('selected');
    }

    if (this.isLevelLocked(id)) {
      previewButton.classList.add('locked');
      previewButton.disabled = true;
    }

    previewButton.addEventListener('click', (e) => {
      const targetButton = e.target as HTMLButtonElement;
      const targetButtonId = Number(targetButton.id);
      settingsStore.currentLevel = targetButtonId;
      this.setDescriptionLanguage(
        gameTranslation as GameTranslationInterface,
        settingsStore.languageValue,
        targetButtonId
      );

      const previouslySelectedButton = document.querySelector('.selected');
      if (previouslySelectedButton) {
        previouslySelectedButton.classList.remove('selected');
      }

      targetButton.classList.add('selected');
    });

    return previewButton;
  }

  isLevelLocked(id: number): boolean {
    const currentScoreById = settingsStore.playerScore[id - 1] || 0;
    const maxScoreById = settingsStore.maxScore[id - 1] || 0;
    return id > 0 && currentScoreById < maxScoreById;
  }

  createPreviewImage(imageUrl: string): HTMLImageElement {
    const previewImage = document.createElement('img');
    previewImage.classList.add(`${this.levelDetailsBaseClass}__preview-image`);
    previewImage.src = imageUrl;
    return previewImage;
  }

  createInfoParagraph(id: string, iconId: string): HTMLParagraphElement {
    const paragraph = document.createElement('p');
    paragraph.id = id;
    paragraph.classList.add(`${this.levelDetailsBaseClass}__text`);

    paragraph.prepend(new SvgIcon(iconId).render());

    const textSpan = document.createElement('span');
    paragraph.append(textSpan);

    return paragraph;
  }

  createScoreWrapper(id: string, iconId: string): HTMLParagraphElement {
    const currentCount = this.createInfoParagraph(id, iconId);

    return currentCount;
  }

  createLevelDetails(): HTMLDivElement {
    const wrapper = this.createWrapper(this.levelDetailsBaseClass);

    const innerBlock = document.createElement('div');
    innerBlock.classList.add(`${this.levelDetailsBaseClass}__inner`);

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add(`${this.levelDetailsBaseClass}__info`);

    infoWrapper.append(this.scoreParagraph, this.hintParagraph);
    innerBlock.append(this.previewImage, infoWrapper, this.levelDescriptionText);
    wrapper.append(this.levelDetailsTitle, innerBlock, this.playLevelButton);

    return wrapper;
  }

  createLevelDescriptionText(id: string): HTMLParagraphElement {
    const levelDescriptionText = document.createElement('p');
    levelDescriptionText.classList.add(`${this.levelDetailsBaseClass}__description`);
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
    this.setDescriptionLanguage(translation, lang, settingsStore.currentLevel);
  }

  setDescriptionLanguage(translation: GameTranslationInterface, lang: LanguageKeys, levelIndex: number): void {
    const timeSpan = this.timeLimitParagraph.querySelector('span');
    const hintSpan = this.hintParagraph.querySelector('span');
    const scoreSpan = this.scoreParagraph.querySelector('span');
    if (timeSpan && hintSpan && scoreSpan) {
      timeSpan.textContent = translation[lang].levelDetailsBlock[levelIndex].timeLimit;
      hintSpan.textContent = translation[lang].levelDetailsBlock[levelIndex].hintText;
      scoreSpan.textContent = `${settingsStore.playerScore[levelIndex] || 0}/${settingsStore.maxScore[levelIndex]}`;
    }
    this.levelDetailsTitle.textContent = translation[lang].levelDetailsBlock[levelIndex].levelTitle;
    this.levelDescriptionText.textContent = translation[lang].levelDetailsBlock[levelIndex].levelDescriptionText;
    this.previewImage.src = this.createPreviewUrl(this.levelImageUrls[levelIndex]);
  }

  createLevelSelectLayout(): HTMLDivElement {
    const layout = document.createElement('div');
    layout.classList.add(`${PageId.LevelSelectPage}__layout`);

    layout.append(this.tutorialWrapper, this.seasonOneWrapper, this.levelDetailsWrapper);

    return layout;
  }

  render(): HTMLElement {
    this.container.append(this.backToMainButton, this.levelSelectLayout);
    return this.container;
  }
}

export default LevelSelectPage;
