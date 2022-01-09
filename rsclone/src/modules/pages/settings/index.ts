import Page from '../../core/templates/page';
import './style.scss';

class SettingsPage extends Page {
  static TextObject = {
    mainTitle: 'Settings Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  };

  render() {
    const title = this.createHeaderTitle(SettingsPage.TextObject.mainTitle, 'h2', 'title')
    this.container.append(title);
    return this.container;
  };

};

export default SettingsPage;