/**
 * @jest-environment jsdom
 */

import { LinkButtonType } from '../../types/types';
import { backToMainButton } from './index';

describe('check BackToMainButton constructor', () => {
  test('is createButton', () => {
    const testObj: LinkButtonType = {
      id: 'test',
      href: 'test',
      className: 'test',
    };
    expect(backToMainButton.createButton(testObj)).toBeInstanceOf(HTMLAnchorElement);

  })
});