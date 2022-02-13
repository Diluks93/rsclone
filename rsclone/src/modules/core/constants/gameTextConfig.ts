import { GameFont } from '../enums/enums';
import { settingsStore } from '../stores/settingsStore';
import { tutorialSpeechConfig } from './constInterfaceScene';

export const actionLabelFontConfig = {
  fontSize: GameFont.MediumSize,
  fontFamily: GameFont.PressStartFamily,
};

export const tutorialSpeechFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: GameFont.TransparentBlackColor,
  fixedWidth: settingsStore.windowWidth - tutorialSpeechConfig.portraitSize,
  padding: 20 as Phaser.Types.GameObjects.Text.TextPadding,
  fixedHeight: tutorialSpeechConfig.portraitSize,
  color: GameFont.WhiteColor,
  fontSize: GameFont.MediumSize,
  fontFamily: GameFont.PressStartFamily,
  wordWrap: { width: settingsStore.windowWidth - tutorialSpeechConfig.portraitSize - tutorialSpeechConfig.offset },
};

export const continueTextFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
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
  fontSize: GameFont.LargeSize,
  fontFamily: GameFont.PressStartFamily,
};
export const endgameFontConfig = {
  fontSize: GameFont.LargeSize,
  fontFamily: GameFont.PressStartFamily,
};
