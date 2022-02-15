/**
 * @jest-environment jsdom
 */

import LevelSelectPage from './index';
import { LevelPreviewType } from '../../core/types/types';

const levelPage = new LevelSelectPage('test', 'test');

describe('LevelSelectPage', () => {
  test('createWrapper', () => {
    expect(levelPage.createWrapper('test')).toBeInstanceOf(HTMLDivElement);
  });
  test('createLevelList', () => {
    expect(levelPage.createLevelList(levelPage.tutorialTitle)).toBeInstanceOf(HTMLDivElement);
  });
  test('createLevelPreviewButton', () => {
    expect(levelPage.createLevelPreviewButton({id: 0, isLocked: false} as LevelPreviewType)).toBeInstanceOf(HTMLButtonElement);
  });
  test('createPreviewImage', () => {
    expect(levelPage.createPreviewImage('test')).toBeInstanceOf(HTMLImageElement);
  });
  test('createInfoParagraph', () => {
    expect(levelPage.createInfoParagraph('test', 'test')).toBeInstanceOf(HTMLParagraphElement);
  });
  test('createScoreWrapper', () => {
    expect(levelPage.createScoreWrapper('test', 'test')).toBeInstanceOf(HTMLParagraphElement);
  });
  test('createLevelDetails', () => {
    expect(levelPage.createLevelDetails()).toBeInstanceOf(HTMLDivElement);
  });
  test('createLevelDescriptionText', () => {
    expect(levelPage.createLevelDescriptionText('test')).toBeInstanceOf(HTMLParagraphElement);
  });
  test('createLevelSelectLayout', () => {
    expect(levelPage.createLevelSelectLayout()).toBeInstanceOf(HTMLDivElement);
  });
  test('render', () => {
    expect(levelPage.render()).toBeInstanceOf(HTMLElement);
  });
})
