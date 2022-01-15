import Page from '../../core/templates/page';
import { jsonUrl } from '../../core/data/jsonUrls';
import { getTranslationJson } from '../../core/utils/utils';
import { CategoriesByLanguageType } from '../../core/types/categoriesTypes';
import { numericConstants } from '../../core/constants/constCategories';
import { PageIds } from '../../core/interfaces/enums';
import './style.scss';
import { StorageKeys } from '../../core/enums/enums';

class CategoriesPage extends Page {
  static TextObject = {
    mainTitle: 'Categories Page',
  };

  async getDataByCategorySection() {
    const data: CategoriesByLanguageType = await getTranslationJson(jsonUrl[StorageKeys.CategoriesTranslation]);
    if (data) return data.ru;
  }

  async addHeader() {
    const categoryData = await this.getDataByCategorySection();
    const pageSectionNames: string[] = [];
    if (categoryData) {
      pageSectionNames.push(categoryData.episodeList, categoryData.episodeDetails);
    }
    const titleArr: HTMLElement[] = [];
    const header = document.createElement('div');
    const headerWrapper = document.createElement('div');
    const headerImage = document.createElement('div');

    header.classList.add('categories-page__header');
    headerWrapper.classList.add('categories-page__header-wrapper');
    headerImage.classList.add('categories-page__header-image');

    for (let i = 0; i < pageSectionNames.length; i++) {
      const headerTitle = document.createElement('div');
      headerTitle.classList.add('categories-page__header-title');
      if (categoryData) {
        headerTitle.innerText = pageSectionNames[i];
      }
      titleArr.push(headerTitle);
    }

    headerWrapper.append(headerImage, ...titleArr);
    header.append(headerWrapper);

    this.container.append(header);
  }

  async addCategoriesWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('categories-page__wrapper');
    wrapper.append(await this.addEpisodeList(), await this.addSeriesDescription());

    this.container.append(wrapper);
  }

  async addEpisodeList(): Promise<HTMLElement> {
    const categoryData = await this.getDataByCategorySection();
    const seriesTitles: string[] = [];
    if (categoryData) {
      seriesTitles.push(categoryData.intro, categoryData.seasonOne, categoryData.seasonTwo);
    }

    const episodeList = document.createElement('div');
    const btnWrapper = document.createElement('div');
    const btn = document.createElement('a');
    const btnInfo = document.createElement('div');
    const seriesArr: HTMLElement[] = [];

    episodeList.classList.add('categories-page__episode-list', 'episode-list');
    btnWrapper.classList.add('episode-list__btn-wrapper');
    btn.classList.add('episode-list__btn');
    btn.href = `#${PageIds.HomePage}`;
    btnInfo.classList.add('episode-list__btn-info');
    if (categoryData) {
      btnInfo.innerText = categoryData.backToMain;
    }

    for (let i = 0; i < numericConstants.NUMBER_SERIES_SECTIONS; i++) {
      const seriesBlock = document.createElement('div');
      const title = document.createElement('div');
      const cards = document.createElement('div');

      seriesBlock.classList.add('episode-list__series-block');
      title.classList.add('episode-list__title');
      cards.classList.add('episode-list__cards');

      if (categoryData) {
        title.innerText = seriesTitles[i];
      }

      if (i === 0) cards.append(...this.addCards(numericConstants.PREPARATORY_LEVEL_NUMBER));
      else cards.append(...this.addCards(numericConstants.MAIN_LEVEL_NUMBER));

      seriesBlock.append(title, cards);
      seriesArr.push(seriesBlock);
    }

    btnWrapper.append(btn, btnInfo);
    episodeList.append(...seriesArr, btnWrapper);

    return episodeList;
  }

  addCards(num: number): HTMLElement[] {
    const result: HTMLElement[] = [];

    for (let i = 0; i < num; i++) {
      const card = document.createElement('div');
      const cardInfo = document.createElement('div');

      card.classList.add('episode-list__card');
      cardInfo.classList.add('episode-list__card-result');
      cardInfo.textContent = '0%';
      card.append(cardInfo);
      card.style.backgroundImage =
        'url("https://raw.githubusercontent.com/Diluks93/source-rsclone/new-files/rsclone-source/neighbor_test.webp")';
      result.push(card);
    }

    return result;
  }

  async addSeriesDescription(): Promise<HTMLDivElement> {
    const seriesDescription = document.createElement('div');
    const title = document.createElement('div');
    const seriesWrapper = document.createElement('div');
    const seriesPic = document.createElement('div');
    const seriesRating = document.createElement('div');
    const seriesTime = document.createElement('div');
    const seriesHint = document.createElement('div');
    const seriesDesc = document.createElement('div');
    const seriesBtnWrapper = document.createElement('div');

    seriesDescription.classList.add('categories-page__series-description', 'series-description');
    title.classList.add('series-description__title');
    seriesWrapper.classList.add('series-description__wrapper');
    seriesPic.classList.add('series-description__pictures-wrap');
    seriesRating.classList.add('series-description__rating');
    seriesTime.classList.add('series-description__time');
    seriesHint.classList.add('series-description__hint');
    seriesDesc.classList.add('series-description__desc');
    seriesBtnWrapper.classList.add('series-description__btn-wrapper');

    title.innerText = 'у телеэкрана';
    seriesDesc.innerText = 'Какой-то текст...';
    seriesPic.append(...this.addSeriesPic());
    seriesRating.append(...(await this.addSeriesRating()));
    seriesTime.append(...(await this.addSeriesTime()));
    seriesHint.append(...(await this.addSeriesHide()));
    seriesBtnWrapper.append(...(await this.addSeriesBtn()));

    seriesWrapper.append(seriesPic, seriesRating, seriesTime, seriesHint, seriesDesc, seriesBtnWrapper);
    seriesDescription.append(title, seriesWrapper);

    return seriesDescription;
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

  async addSeriesTime(): Promise<HTMLElement[]> {
    const categoryData = await this.getDataByCategorySection();
    const result: HTMLElement[] = [];
    const title = document.createElement('div');
    const text = document.createElement('p');

    title.classList.add('series-description__parameter-title');
    text.classList.add('series-description__parameter-text');
    if (categoryData) {
      title.textContent = categoryData.duration;
    }
    text.textContent = '5:00';

    result.push(text, title);

    return result;
  }

  async addSeriesRating(): Promise<HTMLElement[]> {
    const categoryData = await this.getDataByCategorySection();
    const result: HTMLElement[] = [];
    const title = document.createElement('div');
    const text = document.createElement('p');

    title.classList.add('series-description__parameter-title');
    text.classList.add('series-description__parameter-text');
    if (categoryData) {
      title.textContent = categoryData.minimumRating;
    }
    text.textContent = '50%';

    result.push(text, title);

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

  async addSeriesBtn(): Promise<HTMLElement[]> {
    const categoryData = await this.getDataByCategorySection();
    const result: HTMLElement[] = [];
    const title = document.createElement('div');
    const btn = document.createElement('a');

    title.classList.add('series-description__btn-title');
    btn.classList.add('series-description__btn');
    btn.href = `#${PageIds.MainPage}`;
    if (categoryData) {
      title.textContent = categoryData.startEpisode;
    }

    result.push(title, btn);

    return result;
  }

  render() {
    this.addHeader();
    this.addCategoriesWrapper();
    return this.container;
  }
}

export default CategoriesPage;
