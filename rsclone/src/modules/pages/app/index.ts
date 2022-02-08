import Page from '../../core/templates/Page';
import MainPage from '../main/index';
import SettingsPage from '../settings/index';
import AuthorsPage from '../authors/index';
import HomePage from '../home/index';
import LevelSelectPage from '../level-select/index';
import ErrorPage from '../error/index';
import gameTranslation from '../../core/data/gameTranslation.json';

import { settingsStore } from './../../core/stores/settingsStore';
import { PageId, ErrorType } from '../../core/enums/enums';
import { toggleFullScreen } from '../../core/utils/utils';

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = PageId.CurrentPage;
  private initialPage: HomePage;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null = null;

    switch (idPage) {
      case PageId.HomePage:
        page = new HomePage(idPage, PageId.HomePage);
        break;
      case PageId.SettingsPage:
        page = new SettingsPage(idPage, PageId.SettingsPage);
        break;
      case PageId.AuthorsPage:
        page = new AuthorsPage(idPage, PageId.AuthorsPage);
        break;
      case PageId.MainPage:
        page = new MainPage(idPage, PageId.MainPage);
        break;
      case PageId.LevelSelectPage:
        page = new LevelSelectPage(idPage, PageId.LevelSelectPage);
        break;
      default:
        page = new ErrorPage(idPage, PageId.ErrorPage, ErrorType.Error_404);
    }

    if (page) {
      page.setPageLanguage(gameTranslation, settingsStore.languageValue);
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    App.container = document.body;
    this.initialPage = new HomePage(PageId.HomePage, PageId.HomePage);
  }

  start(): void {
    App.renderNewPage(PageId.MainPage);
    this.enableRouteChange();

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.keyCode === 70) toggleFullScreen();
    });

    window.location.hash = PageId.MainPage;
  }
};

export default App;
