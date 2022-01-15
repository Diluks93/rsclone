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
  isEnabled: boolean;
  clickHandler(): void;
};

export type SettingsRangeType = {
  iconUrl: string;
  id: string;
  min: string;
  max: string;
  step: string;
  value: string;
  inputHandler(e: Event): void;
};

export type SettingsSelectType = {
  id: string;
  // options: Record<string, string>;
  options: LanguageKeys[];
  changeHandler(e: Event): void;
};

export type SettingsConfigType = {
  languageValue: LanguageKeys;
  volumeValue: string;
  isSoundEnabled: boolean;
  isTimeLimitEnabled: boolean;
  isTricksReportEnabled: boolean;
};

export type LanguageKeys = 'ru' | 'en';
