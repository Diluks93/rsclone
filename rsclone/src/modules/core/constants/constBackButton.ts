import { IconId } from './../enums/enums';
import { LinkButtonType } from '../types/types';
import { PageId } from '../enums/enums';

export const backButtonProps: LinkButtonType = {
  className: 'back-button',
  id: 'backToMainButton',
  href: `#${PageId.HomePage}`,
  iconId: IconId.ArrowLeft,
};
