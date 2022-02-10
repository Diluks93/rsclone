import { GameFont } from '../enums/enums';
import { settingsStore } from '../stores/settingsStore';
import { speechConfig } from './constInterfaceScene';

export const actionLabelFontConfig = {
  fontSize: GameFont.MediumSize,
  fontFamily: GameFont.PressStartFamily,
};

export const tutorialSpeechFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: GameFont.TransparentBlackColor,
  fixedWidth: settingsStore.windowWidth - speechConfig.portraitSize,
  padding: 20 as Phaser.Types.GameObjects.Text.TextPadding,
  fixedHeight: speechConfig.portraitSize,
  color: GameFont.WhiteColor,
  fontSize: GameFont.MediumSize,
  fontFamily: GameFont.PressStartFamily,
  wordWrap: { width: settingsStore.windowWidth - speechConfig.portraitSize - speechConfig.offset },
};

export const tutorialHintFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  fontSize: GameFont.SmallSize,
  fontFamily: GameFont.PressStartFamily,
  align: GameFont.RightAlign,
};

export const loaderFontConfig = {
  sizeM: GameFont.MediumSize,
  sizeS: GameFont.SmallSize,
  family: GameFont.PressStartFamily,
};

export const scoreFontConfig = {
  fontSise: GameFont.LargeSize,
  fontFamily: GameFont.PressStartFamily,
};
export const endGameFontConfig = {
  fontFamily: GameFont.PressStartFamily,
};
