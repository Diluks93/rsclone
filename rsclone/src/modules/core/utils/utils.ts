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
  const soundResolution: boolean = JSON.parse(localStorage.getItem('soundCheckbox') as string);
  const button = event?.target as HTMLElement;

  if (
    (audio.paused && soundResolution) ||
    soundResolution === null ||
    (button && button.id === 'exit-level' && soundResolution)
  ) {
    audio.play();
  } else if (!soundResolution || (button && button.id === 'playLevelButton')) {
    audio.pause();
    audio.currentTime = 0;
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
