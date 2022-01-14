import { LanguageKeys } from '../stores/translationStore';

export type SettingsButtonType = {
  text: string;
  id: string;
};

export type SettingsLinkButtonType = {
  text: string;
  id: string;
  href: string;
};

export type SettingsCheckboxType = {
  text: string;
  id: string;
};

export type SettingsRangeType = {
  iconUrl: string;
  id: string;
  min: string;
  max: string;
  step: string;
  value: string;
};

export type SettingsSelectType = {
  id: string;
  // options: Record<string, string>;
  options: LanguageKeys[];
};
