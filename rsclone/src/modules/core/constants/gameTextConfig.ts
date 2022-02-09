import { GameFontSize } from '../enums/enums';
import { settingsStore } from '../stores/settingsStore';
import { speechConfig } from './constInterfaceScene';

export const actionLabelFontConfig = {
  fontSize: GameFontSize.LargeFont,
  fontFamily: 'sans-serif',
  backgroundColor: 'rgba(0,0,0,0.5)',
  fixedWidth: 30,
  align: 'center',
};

export const tutorialSpeechFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  fixedWidth: settingsStore.windowWidth - speechConfig.portraitSize,
  padding: 20 as Phaser.Types.GameObjects.Text.TextPadding,
  fixedHeight: speechConfig.portraitSize,
  color: '#fff',
  fontSize: GameFontSize.MediumFont,
  fontFamily: 'Open sans',
  wordWrap: { width: settingsStore.windowWidth - speechConfig.portraitSize },
};

export const tutorialHintFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  fontSize: GameFontSize.SmallFont,
  fontFamily: 'Open sans',
  align: 'right',
};

export const loaderFontConfig = {
  sizeM: GameFontSize.MediumFont,
  sizeS: GameFontSize.SmallFont,
  family: '"Open Sans", sans-serif',
};
