import Page from '../../core/templates/page';
import { LevelsSeries } from '../../core/interfaces/enums';
import './style.scss';

interface IData {
  episodeList: string;
  episodeDetails: string;
  intro: string;
  seasonOne: string;
  seasonTwo: string;
  backToMain: string;
  startEpisode: string;
  hintTitle: string;
  minimumRating: string;
  duration: string;
}

interface ILang {
  ru: IData;
  en: IData;
}

class CategoriesPage extends Page {
  static TextObject = {
    mainTitle: 'Categories Page',
  };

  async getInfo() {
    const url = 'https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source/json/categories.json';
    const responce = await fetch(url);
    const data: ILang = await responce.json();
    return data;
  }

  async addHeader() {
    const data = await this.getInfo();
    const dataArr = [data.ru.episodeList, data.ru.episodeDetails];
    const titleArr: HTMLElement[] = [];
    const header = document.createElement('div');
    const headerWrapper = document.createElement('div');
    const headerImage = document.createElement('div');

    header.classList.add('categories-page__header');
    headerWrapper.classList.add('categories-page__header-wrapper');
    headerImage.classList.add('categories-page__header-image');

    for (let i = 0; i < dataArr.length; i++) {
      const headerTitle = document.createElement('div');
      headerTitle.classList.add('categories-page__header-title');
      headerTitle.innerText = dataArr[i];
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

  async addEpisodeList() {
    const data = await this.getInfo();
    const dataArr = [data.ru.intro, data.ru.seasonOne, data.ru.seasonTwo];
    const episodeList = document.createElement('div');
    const btnWrapper = document.createElement('div');
    const btn = document.createElement('div');
    const btnInfo = document.createElement('div');
    const seriesArr: HTMLElement[] = [];

    episodeList.classList.add('categories-page__episode-list', 'episode-list');
    btnWrapper.classList.add('episode-list__btn-wrapper');
    btn.classList.add('episode-list__btn');
    btnInfo.classList.add('episode-list__btn-info');
    btnInfo.innerText = data.ru.backToMain;

    for (let i = 0; i < dataArr.length; i++) {
      const seriesBlock = document.createElement('div');
      const title = document.createElement('div');
      const cards = document.createElement('div');

      seriesBlock.classList.add('episode-list__series-block');
      title.classList.add('episode-list__title');
      cards.classList.add('episode-list__cards');

      title.innerText = dataArr[i];

      if (i === 0) cards.append(...this.addCards(LevelsSeries.preparatoryLevel));
      else cards.append(...this.addCards(LevelsSeries.mainLevel));

      seriesBlock.append(title, cards);
      seriesArr.push(seriesBlock);
    }

    btnWrapper.append(btn, btnInfo);
    episodeList.append(...seriesArr, btnWrapper);

    return episodeList;
  }

  addCards(num: number) {
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

  async addSeriesDescription() {
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
    seriesRating.append(...this.addSeriesRating());
    seriesTime.append(...this.addSeriesTime());
    seriesHint.append(...this.addSeriesHide());
    seriesBtnWrapper.append(...this.addSeriesBtn());

    seriesWrapper.append(seriesPic, seriesRating, seriesTime, seriesHint, seriesDesc, seriesBtnWrapper);
    seriesDescription.append(title, seriesWrapper);

    return seriesDescription;
  }

  addSeriesHide() {
    const result: HTMLElement[] = [];
    const title = document.createElement('div');
    const text = document.createElement('p');

    title.classList.add('series-description__hint-title');
    text.classList.add('series-description__hint-text');
    title.textContent = 'Подсказка!';
    text.textContent = 'Слушайте советы режисера!';

    result.push(title, text);

    return result;
  }

  addSeriesTime() {
    const result: HTMLElement[] = [];
    const title = document.createElement('div');
    const text = document.createElement('p');

    title.classList.add('series-description__parameter-title');
    text.classList.add('series-description__parameter-text');
    title.textContent = 'Минимальное время';
    text.textContent = '5:00 мин';

    result.push(text, title);

    return result;
  }

  addSeriesRating() {
    const result: HTMLElement[] = [];
    const title = document.createElement('div');
    const text = document.createElement('p');

    title.classList.add('series-description__parameter-title');
    text.classList.add('series-description__parameter-text');
    title.textContent = 'Минимальный рейтинг';
    text.textContent = '50%';

    result.push(text, title);

    return result;
  }

  addSeriesPic() {
    const result: HTMLElement[] = [];
    const img = document.createElement('div');
    const title = document.createElement('div');

    title.classList.add('series-description__pictures-title');
    img.classList.add('series-description__pictures');
    title.textContent = 'Соседушка в любимом кресле';

    result.push(img, title);

    return result;
  }

  addSeriesBtn() {
    const result: HTMLElement[] = [];
    const title = document.createElement('div');
    const btn = document.createElement('div');

    title.classList.add('series-description__btn-title');
    btn.classList.add('series-description__btn');
    title.textContent = 'Съемка';

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
