import { AssetUrl, StorageKey } from '../enums/enums';

export const backgroundMusic = new Audio();
backgroundMusic.src = `${AssetUrl.Main}/audio/main-menu.mp3`;
backgroundMusic.loop = true;
backgroundMusic.volume = +(localStorage.getItem(StorageKey.SoundVolume) || 0.5);
