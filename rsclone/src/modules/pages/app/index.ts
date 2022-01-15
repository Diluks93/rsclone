import MainPage from '../main/index';
import SettingsPage from '../settings/index';
import AuthorsPage from '../authors/index';
import HomePage from '../home/index';
import CategoriesPage from '../categories/index';
import ErrorPage from '../error/index';
import Page from '../../core/templates/page';
import { PageIds, ErrorTypes} from '../../core/enums/enums';
import Footer from '../../core/components/footer/index';

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = PageIds.CurrentPage;
  private initialPage: HomePage;
  private footer: Footer;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if(currentPageHTML) {
      currentPageHTML.remove();
    };

    let page: Page | null = null;

    switch (idPage) {
      case (PageIds.HomePage): page = new HomePage(idPage, PageIds.HomePage);
        break;
      case (PageIds.SettingsPage): page = new SettingsPage(idPage, PageIds.SettingsPage);
        break;
      case (PageIds.AuthorsPage): page = new AuthorsPage(idPage, PageIds.AuthorsPage);
        break;
      case (PageIds.MainPage): page = new MainPage(idPage, PageIds.MainPage);
        break;
      case (PageIds.CategoriesPage): page = new CategoriesPage(idPage, PageIds.CategoriesPage);
        break;
      default: page = new ErrorPage(idPage, PageIds.ErrorPage, ErrorTypes.Error_404);
    };

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    };
  };

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  };

  constructor() {
    App.container = document.body;
    this.initialPage = new HomePage(PageIds.HomePage, PageIds.HomePage);
    this.footer = new Footer('footer', 'footer');
  };

  start(): void {
    
    //TODO Что бы постоянно не перещелкивать страницу при разработке передайте аргументом сюда свою страницу.
    App.renderNewPage(PageIds.HomePage); 
    this.enableRouteChange();
    App.container.append(this.footer.render());
    
    //TODO И следующую строку закомментируйте.
    window.location.hash = PageIds.HomePage;
  };
};

export default App;