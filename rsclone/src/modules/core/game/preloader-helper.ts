import GameScene from './game-scene';
import { GameKeys, UrlsSourcesForGame } from '../enums/enums';

export default class PreloadHelper {
  static preload(scene: GameScene): void {
    scene.load.setBaseURL(UrlsSourcesForGame.Main);
    scene.load.image(GameKeys.Assets, UrlsSourcesForGame.Tileset);
    scene.load.tilemapTiledJSON(GameKeys.Map, UrlsSourcesForGame.TilemapJson);
    
    scene.load.spritesheet(GameKeys.Player, UrlsSourcesForGame.Player, { frameWidth: 190, frameHeight: 257 });
  };

}
