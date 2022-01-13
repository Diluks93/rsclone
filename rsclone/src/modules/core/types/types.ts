type SettingsButtonType = {
  text: string;
  id: string;
};

type SettingsLinkButtonType = {
  text: string;
  id: string;
  href: string;
};

type SettingsCheckboxType = {
  text: string;
  id: string;
  isEnabled: boolean;
  clickHandler(): void;
};

type SettingsRangeType = {
  iconUrl: string;
  id: string;
  min: string;
  max: string;
  step: string;
  value: string;
  inputHandler(e: Event): void;
};

type SettingsSelectType = {
  id: string;
  // options: Record<string, string>;
  options: LanguageKeys[];
  changeHandler(e: Event): void;
};

type SettingsConfigType = {
  languageValue: LanguageKeys;
  volumeValue: string;
  isSoundEnabled: boolean;
  isTimeLimitEnabled: boolean;
  isTricksReportEnabled: boolean;
};

type LanguageKeys = 'ru' | 'en';

type ButtonAuthorsOrNames = {
  text: string;
  url?: string;
  id?: string;
}[];

export { 
  SettingsButtonType, 
  SettingsCheckboxType, 
  SettingsRangeType, 
  SettingsLinkButtonType, 
  SettingsSelectType, 
  SettingsConfigType, 
  LanguageKeys, 
  ButtonAuthorsOrNames };
