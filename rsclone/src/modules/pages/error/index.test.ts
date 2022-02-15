/**
 * @jest-environment jsdom
 */

import ErrorPage from './index';

const errorPage = new ErrorPage('test', 'test', 'error');

describe('ErrorPage', () => {
  test('render', () => {
    expect(errorPage.render()).toBeInstanceOf(HTMLElement);
  });
})
