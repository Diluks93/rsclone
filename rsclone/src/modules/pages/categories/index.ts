import Page from '../../core/templates/page';
import { LevelsSeries } from '../../core/interfaces/enums';
import './style.scss';
class CategoriesPage extends Page {
  static TextObject = {
    mainTitle: 'Categories Page',
  };

  async getInfo() {
    const url = 'https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source/json/categories.json';
    const responce = await fetch(url);
    const data = await responce.json();
    return data;
  }

  async addHeader() {
    const data = await this.getInfo();
    const dataArr = [data.ru.episodeList, data.ru.episodeDetails];
    const titleArr = [];
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
    const seriesDescription = document.createElement('div');

    wrapper.classList.add('categories-page__wrapper');
    seriesDescription.classList.add('categories-page__series-description', 'series-description');

    wrapper.append(await this.addEpisodeList(), seriesDescription);

    this.container.append(wrapper);
  }

  async addEpisodeList() {
    const data = await this.getInfo();
    const dataArr = [data.ru.intro, data.ru.seasonOne, data.ru.seasonTwo];
    const episodeList = document.createElement('div');
    const btnWrapper = document.createElement('div');
    const btn = document.createElement('div');
    const btnInfo = document.createElement('div');
    const seriesArr = [];

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
    const result = [];

    for (let i = 0; i < num; i++) {
      const card = document.createElement('div');
      card.classList.add('episode-list__card');
      card.style.backgroundImage =
        'url("https://raw.githubusercontent.com/Diluks93/source-rsclone/new-files/rsclone-source/neighbor_test.webp")';
      result.push(card);
    }

    return result;
  }

  addSeriesDescription() {}

  render() {
    this.addHeader();
    this.addCategoriesWrapper();
    return this.container;
  }
}

export default CategoriesPage;
