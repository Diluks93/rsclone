import { UrlSourceForGame, StorageKey } from '../enums/enums';

export const backgroundMusic = new Audio();
backgroundMusic.src = `${UrlSourceForGame.Main}/audio/main-menu.mp3`;
backgroundMusic.loop = true;
backgroundMusic.volume = +(localStorage.getItem(StorageKey.SoundVolume) || 0.5);
