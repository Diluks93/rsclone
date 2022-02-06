import { speechConfig } from './constInterfaceScene';

export const actionLabelConfig = {
  fontSize: '30px',
  fontFamily: 'sans-serif',
  backgroundColor: 'rgba(0,0,0,0.5)',
  fixedWidth: 30,
  align: 'center',
};

export const tutorialSpeechFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  fixedWidth: speechConfig.screenWidth / 2,
  padding: 20 as Phaser.Types.GameObjects.Text.TextPadding,
  fixedHeight: speechConfig.portraitSize,
  color: '#fff',
  fontSize: '25px',
  fontFamily: 'Open sans',
  wordWrap: { width: speechConfig.screenWidth / 2 - speechConfig.offset },
};

export const tutorialHintFontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  fontSize: '20px',
  fontFamily: 'Open sans',
  fixedWidth: 300,
  align: 'right',
};
