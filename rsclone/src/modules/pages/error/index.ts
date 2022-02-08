import Page from '../../core/templates/Page';
import './style.scss';

class ErrorPage extends Page {
  private errorType: string;

  static TextObject: { [key: string]: string } = {
    '404': 'Error! The page was not found.',
  };

  constructor(id: string, className: string, errorType: string) {
    super(id, className);
    this.errorType = errorType;
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default ErrorPage;
