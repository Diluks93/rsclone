type SettingsButtonType = {
  text: string;
  id: string;
};

type SettingsCheckboxType = {
  text: string;
  id: string;
};

type SettingsRangeType = {
  iconUrl: string;
  id: string;
  value: string;
};

type ButtonAuthors = {
  text: string;
  url?: string;
  id?: string;
}[];

export { SettingsButtonType, SettingsCheckboxType, SettingsRangeType, ButtonAuthors };