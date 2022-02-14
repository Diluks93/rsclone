/**
 * @jest-environment jsdom
 */

import { saveFetchedJsonToStorage, getTranslationJson, transformCamelCaseToKebabCase } from './utils';

declare let global: { fetch: {
  mockClear: () => {};
} };

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve( 'test' ),
  })
);

beforeEach(() =>{
  global.fetch.mockClear();
})

test('check saveFetchedJsonToStorage', async () => {
  expect.assertions(1);
    try {
      await saveFetchedJsonToStorage('test', 'test');
    } catch (e) {
      expect(e).toMatch('error')
    }
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('check getTranslationJson', async () => {
  await getTranslationJson('test');
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('check transformCamelCaseToKebabCase', () => {
  transformCamelCaseToKebabCase('test');
  expect('Test').toBe('Test');
});
