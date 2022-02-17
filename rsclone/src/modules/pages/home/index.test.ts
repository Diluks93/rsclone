/**
 * @jest-environment jsdom
 */

import HomePage from './index';
import { GameTranslationInterface } from '../../core/types/types';

const homePage = new HomePage('test', 'test');
const spy = jest.spyOn(HomePage.prototype as HomePage, 'setPageLanguage');
const translateTest = jest.createMockFromModule('../../core/data/gameTranslation.json');

describe('HomePage', () => {
  test('createWrapper', () => {
    expect(homePage.createWrapper('test')).toBeInstanceOf(HTMLDivElement);
  });
  test('createRangeError', () => {
    expect(homePage.createRangeError()).toBeInstanceOf(HTMLDivElement);
  });
  test('createFullScreenModal', () => {
    expect(homePage.createFullScreenModal()).toBeInstanceOf(HTMLDivElement);
  });
  test('setPageLanguage', () => {
    homePage.setPageLanguage(translateTest as GameTranslationInterface, 'en');
    expect(homePage.setPageLanguage(translateTest as GameTranslationInterface, 'en')).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(translateTest, 'en');
  });
  test('render', () => {
    expect(homePage.render()).toBeInstanceOf(HTMLElement);
  });
});
