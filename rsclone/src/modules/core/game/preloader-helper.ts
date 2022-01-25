import GameScene from './game-scene';
import { GameKeys, Urls } from '../enums/enums';

export default class PreloadHelper {
  static preload(scene: GameScene): void {
    scene.load.setBaseURL(Urls.main);
    scene.load.image(GameKeys.ASSETS, Urls.assets);
    scene.load.tilemapTiledJSON(GameKeys.MAP, Urls.map);
    
    scene.load.spritesheet(GameKeys.DUDE_KEY, Urls.voody, { frameWidth: 190, frameHeight: 257 });
  }

}