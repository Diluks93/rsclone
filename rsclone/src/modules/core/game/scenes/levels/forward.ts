import GameScene from './gameScene';
import Neighbor from '../../entities/neighbor';
import TrickSourceItem from '../../helpers/trickSourceItem';

import { GameKey, SceneKey } from '../../../enums/enums';
import Player from '../../entities/player';


export default class Forward extends GameScene {
  protected neighbor!: Neighbor;
  pen: Phaser.GameObjects.Image | undefined;

  constructor() {
    super({ key: SceneKey.Forward });
  }

  create() {
    super.create();
    const picture = this.createTrickTargetItem({
      x: 1600,
      y: 1200,
      originalItemKey: GameKey.Picture,
      trickedItemKey: GameKey.TrickedPicture,
      actionItemKey: GameKey.Pen,
    });
    const pen = new TrickSourceItem(this, 1000, 1000, GameKey.Pen);
    this.trickTargetItems.push(picture);
    this.neighbor = new Neighbor(this, 3700, 1300, GameKey.Neighbor, this.player, 7);
    
    this.trickSourceItems.push(pen);
    this.physics.add.collider(this.player, this.neighbor, (player, neighbor) => {
      (player as Player).getDamage(1);
    });
    this.physics.add.collider(this.neighbor, this.floor as Phaser.Tilemaps.TilemapLayer);
    super.addOverlapActionToItems();
  }
};
