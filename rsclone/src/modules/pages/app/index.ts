import MainPage from '../main/index';
import SettingsPage from '../settings/index';
import AuthorsPage from '../authors/index';
import HomePage from '../home/index';
import LevelsPage from '../levels/index';
import ErrorPage from '../error/index';
import Page from '../../core/templates/Page';
import { PageIds, ErrorTypes } from '../../core/enums/enums';

class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId: string = PageIds.CurrentPage;

  private initialPage: HomePage;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null = null;

    switch (idPage) {
      case PageIds.HomePage:
        page = new HomePage(idPage, PageIds.HomePage);
        break;
      case PageIds.SettingsPage:
        page = new SettingsPage(idPage, PageIds.SettingsPage);
        break;
      case PageIds.AuthorsPage:
        page = new AuthorsPage(idPage, PageIds.AuthorsPage);
        break;
      case PageIds.MainPage:
        page = new MainPage(idPage, PageIds.MainPage);
        break;
      case PageIds.LevelsPage:
        page = new LevelsPage(idPage, PageIds.LevelsPage);
        break;
      default:
        page = new ErrorPage(idPage, PageIds.ErrorPage, ErrorTypes.Error_404);
    }

    if (page) {
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
    this.initialPage = new HomePage(PageIds.HomePage, PageIds.HomePage);
  }

  start(): void {
    //TODO Что бы постоянно не перещелкивать страницу при разработке передайте аргументом сюда свою страницу.
    App.renderNewPage(PageIds.LevelsPage);
    this.enableRouteChange();

    //TODO И следующую строку закомментируйте.
    window.location.hash = PageIds.LevelsPage;
  }
}

export default App;
