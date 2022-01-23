import GameScene from "./game-scene";

const DUDE_KEY = 'dude';

export default class PreloadHelper {
  static preload(scene: GameScene): void {
    scene.load.setBaseURL('https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source');
    scene.load.image('assets', 'game/map/assets.png');
    scene.load.tilemapTiledJSON('map', 'game/map/map-test.json');
    
    scene.load.spritesheet(DUDE_KEY, 'game/voody.png', { frameWidth: 190, frameHeight: 257 });
  }

    // preload() {
  //   this.load.setBaseURL('https://raw.githubusercontent.com/Diluks93/source-rsclone/main/rsclone-source');

  //   this.load.image('assets', 'game/map/assets.png');
  //   this.load.tilemapTiledJSON('map', 'game/map/map..json');
    
  //   // this.load.image('bricks', 'game/bricks-wall.png');
  //   // this.load.image(WALL_KEY, 'game/wall.png');
  //   this.load.spritesheet(DUDE_KEY, 'game/voody.png', { frameWidth: 190, frameHeight: 257 });
  // }

}