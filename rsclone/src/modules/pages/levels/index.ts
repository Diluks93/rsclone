import { transformCamelCaseToKebabCase } from './../../core/utils/utils';
import { levelDescriptionProps } from './../../core/constants/constLevels';
import { levelTitlesProps } from '../../core/constants/constLevels';
import Page from '../../core/templates/Page';
import { jsonUrl } from '../../core/data/jsonUrls';
import { getTranslationJson } from '../../core/utils/utils';
import { CategoriesByLanguageType } from '../../core/types/categoriesTypes';
import { StorageKeys } from '../../core/enums/enums';
import { DescriptionType, TitleType } from '../../core/types/types';
import './style.scss';

class LevelsPage extends Page {
  static TextObject = {
    mainTitle: 'Categories Page',
  };

  async getDataByCategorySection() {
    const data: CategoriesByLanguageType = await getTranslationJson(jsonUrl[StorageKeys.CategoriesTranslation]);
    if (data) return data.ru;
  }

  createLevelsLayout() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('levels-page__layout');
    this.createLevelsList(levelTitlesProps).forEach((list) => wrapper.append(list));
    wrapper.append(this.createLevelDescription(levelDescriptionProps[0]));
    return wrapper;
  }

  createLevelsList(props: TitleType[]): HTMLDivElement[] {
    const categoriesList = props.map((titleProps) => {
      const wrapper = this.createWrapper('levels-list', this.createHeaderTitle(titleProps));
      const { pageName } = titleProps;
      wrapper.append(this.createLevelPreviewBox(pageName));
      return wrapper;
    });

    return categoriesList;
  }

  createLevelPreviewBox(pageName: string): HTMLDivElement {
    const previewBox = document.createElement('div');
    previewBox.className = `${pageName}__preview-box`;
    [1, 2, 3].forEach((_, i) => {
      const preview = document.createElement('div');
      preview.classList.add(`${pageName}__preview`);
      //todo: create type for levels and define props
      //todo: class,name?,image,done
      if (i !== 0) {
        preview.classList.add('locked');
      }
      previewBox.append(preview);
    });
    return previewBox;
  }

  createLevelDescription({
    pageName,
    titleProps,
    timeLimitText,
    timeLimitId,
    ratingCount,
    ratingCountId,
    hintText,
    hintId,
    levelDescriptionText,
    levelDescriptionId,
  }: DescriptionType): HTMLDivElement {
    const wrapper = this.createWrapper('description', this.createHeaderTitle(titleProps));

    const inner = document.createElement('div');
    inner.className = `${pageName}__inner`;

    const timeLimitElement = this.createInfoSpan(pageName, timeLimitText, timeLimitId);
    const ratingWrapper = this.createRatingWrapper(pageName, ratingCount, ratingCountId);
    const hintSpan = this.createInfoSpan(pageName, hintText, hintId);
    inner.append(timeLimitElement, ratingWrapper, hintSpan);

    wrapper.append(inner);
    return wrapper;
  }

  createInfoSpan(pageName: string, text: string, id: string): HTMLSpanElement {
    const span = document.createElement('span');
    const spanModificator = transformCamelCaseToKebabCase(id);
    span.classList.add(`${pageName}__span`, `${pageName}__span--${spanModificator}`);
    span.id = id;
    span.textContent = text;
    return span;
  }

  createRatingWrapper(pageName: string, text: string, id: string): HTMLDivElement {
    const ratingWrapper = document.createElement('div');
    ratingWrapper.className = `${pageName}__rating-wrapper`;
    const currentCount = this.createInfoSpan(pageName, text, id);
    const totalCount = document.createElement('span');
    totalCount.className = `${pageName}__total-count`;
    // todo: change to variable count
    totalCount.textContent = '/5';
    ratingWrapper.append(currentCount, totalCount);
    return ratingWrapper;
  }

  async addSeriesHide(): Promise<HTMLElement[]> {
    const categoryData = await this.getDataByCategorySection();
    const result: HTMLElement[] = [];
    const title = document.createElement('div');
    const text = document.createElement('p');

    title.classList.add('series-description__hint-title');
    text.classList.add('series-description__hint-text');
    if (categoryData) {
      title.textContent = categoryData.hintTitle;
    }
    text.textContent = 'Слушайте советы режисера!';

    result.push(title, text);

    return result;
  }

  addSeriesPic(): HTMLElement[] {
    const result: HTMLElement[] = [];
    const img = document.createElement('div');
    const title = document.createElement('div');

    title.classList.add('series-description__pictures-title');
    img.classList.add('series-description__pictures');
    title.textContent = 'Соседушка в любимом кресле';

    result.push(img, title);

    return result;
  }

  // levels-list
  createWrapper(className: string, titleElement: HTMLElement): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper', 'levels-page__wrapper', `${className}`);
    wrapper.append(titleElement);
    return wrapper;
  }

  render() {
    // this.addHeader();
    this.renderBackBtn();
    this.container.append(this.createLevelsLayout());
    return this.container;
  }
}

export default LevelsPage;
