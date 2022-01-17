type TitleType = {
  pageName: string;
  tagName: string;
  id: string;
  text?: string;
  imageUrl?: string;
};

type LinkButtonType = {
  text: string;
  className: string;
  pageName?: string;
  id: string;
  href: string;
  subTitle?: string;
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
  SettingsCheckboxType,
  SettingsRangeType,
  LinkButtonType,
  SettingsSelectType,
  SettingsConfigType,
  LanguageKeys,
  ButtonAuthorsOrNames,
  TitleType,
};
