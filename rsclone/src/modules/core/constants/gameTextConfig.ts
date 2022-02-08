import { speechConfig } from './constInterfaceScene';

export const actionLabelFontConfig = {
  fontSize: '3rem',
  fontFamily: 'sans-serif',
  backgroundColor: 'rgba(0,0,0,0.5)',
  fixedWidth: 30,
  align: 'center',
};

export const tutorialSpeechFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  fixedWidth: 800,
  padding: 20 as Phaser.Types.GameObjects.Text.TextPadding,
  fixedHeight: speechConfig.portraitSize,
  color: '#fff',
  fontSize: '2rem',
  fontFamily: 'Open sans',
  wordWrap: { width: speechConfig.screenWidth / 2 - speechConfig.offset },
};

export const tutorialHintFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  fontSize: '1.5rem',
  fontFamily: 'Open sans',
  fixedWidth: 300,
  align: 'right',
};

export const loaderFontConfig = {
  sizeL: '2.5rem',
  sizeM: '1.5rem',
  family: '"Open Sans", sans-serif',
};
