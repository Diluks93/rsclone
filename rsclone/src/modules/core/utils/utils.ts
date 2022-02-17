import { NavigationButtonsId, StorageKey } from '../enums/enums';

export const saveFetchedJsonToStorage = async (localKey: string, url: string): Promise<void> => {
  try {
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        localStorage.setItem(localKey, JSON.stringify(json));
      });
  } catch (e) {
    console.error(e);
  }
};

export const getTranslationJson = async (url: string) => {
  try {
    const translationData = await fetch(url);
    const translationJson = await translationData.json();
    return translationJson;
  } catch (e) {
    console.error(e);
  }
};

export const getKeyByValue = (object: Record<string, string>, value: string): string | undefined => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const transformCamelCaseToKebabCase = (camelCaseString: string): string => {
  return camelCaseString
    .replace(/([a-z](?=[A-Z]))/g, '$1 ')
    .toLowerCase()
    .split(' ')
    .join('-');
};

export const turnOnBackgroundMusic = (audio: HTMLAudioElement, event?: MouseEvent): void => {
  const hasBackgroundMusicResolution: boolean = JSON.parse(localStorage.getItem(StorageKey.SoundCheckbox) as string);
  const button = event?.target as HTMLElement;

  if (hasBackgroundMusicResolution === false || (button && button.id === NavigationButtonsId.PlayLevelButton)) {
    audio.pause();
    audio.currentTime = 0;
  } else if (
    (audio.paused && hasBackgroundMusicResolution) ||
    hasBackgroundMusicResolution === null ||
    (button && button.id === NavigationButtonsId.ExitTheGame && hasBackgroundMusicResolution)
  ) {
    audio.play();
  }
};

export const adjustVolume = (audio: HTMLAudioElement, value: number): void => {
  audio.volume = value;
};

export const toggleFullScreen = (): void => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

export function importFilesFromFolder(context: __WebpackModuleApi.RequireContext): Record<string, string> {
  const files: Record<string, string> = {};
  context.keys().map((link) => {
    const fileName = link.replace('./', '').replace('.png', '');
    files[fileName] = context(link);
  });
  return files;
}
