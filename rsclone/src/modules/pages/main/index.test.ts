/**
 * @jest-environment jsdom
 */

import MainPage from './index';
import { GameTranslationInterface } from '../../core/types/types';

const mainPage = new MainPage('test', 'test');
const spy = jest.spyOn(MainPage.prototype as MainPage, 'setPageLanguage');
const translateTest = jest.createMockFromModule('../../core/data/gameTranslation.json');

describe('MainPage', () => {
  test('setPageLanguage', () => {
    mainPage.setPageLanguage(translateTest as GameTranslationInterface, 'en');
    expect(mainPage.setPageLanguage(translateTest as GameTranslationInterface, 'en')).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(translateTest, 'en');
  });
  test('render', () => {
    expect(mainPage.render()).toBeInstanceOf(HTMLElement);
  });
})
