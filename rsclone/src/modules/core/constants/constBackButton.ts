import { LinkButtonType } from '../types/types';
import { PageIds } from '../enums/enums';

export const backButtonProps: LinkButtonType = {
  className: 'back-button',
  id: 'backToMainButton',
  href: `#${PageIds.HomePage}`,
};
