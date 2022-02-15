/**
 * @jest-environment jsdom
 */

import AuthorsPage from '.';
import { GameTranslationInterface, LinkButtonType } from '../../core/types/types';

const authorsPage = new AuthorsPage('test', 'test');
const testObj: LinkButtonType = {
  id: 'test',
  href: 'test',
  subTitle: 'test',
};
const translateTest = jest.createMockFromModule('../../core/data/gameTranslation.json');
const spy = jest.spyOn(AuthorsPage.prototype as AuthorsPage, 'setPageLanguage');

describe('AuthorsPage', () => {
  
  test('createAuthorButton', () => {
    expect(authorsPage.createAuthorButton(testObj)).toBeInstanceOf(HTMLDivElement);
  });
  test('setPageLanguage', () => {
    authorsPage.setPageLanguage(translateTest as GameTranslationInterface, 'en');
    expect(authorsPage.setPageLanguage(translateTest as GameTranslationInterface, 'en')).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(translateTest, 'en');
  });
  test('render', () => {
    expect(authorsPage.render()).toBeInstanceOf(HTMLElement);
  });
})
