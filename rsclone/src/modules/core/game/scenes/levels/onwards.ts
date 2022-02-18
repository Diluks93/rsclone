import { GameImageKey } from './../../../enums/enums';
import GameScene from './gameScene';
import Neighbor from '../../entities/neighbor';
import TrickSourceItem from '../../helpers/trickSourceItem';
import { MaxScore, SceneKey } from '../../../enums/enums';
import { Player } from '../../entities/player';

export default class Onwards extends GameScene {
  protected neighbor!: Neighbor;

  pen: Phaser.GameObjects.Image | undefined;

  constructor() {
    super({ key: SceneKey.Onwards });
    this.winScore = MaxScore.Onwards;
  }

  create(): void {
    super.create();
    this.initNeighbor();
    this.initThingsOfJoke();
    this.initThings();
  }

  private initNeighbor(): void {
    this.physics.add.collider(this.player, this.neighbor, (player) => {
      (player as Player).getDamage(1);
    });
    this.physics.add.collider(this.neighbor, this.floor as Phaser.Tilemaps.TilemapLayer);
  }

  private initThings(): void {
    const spawnPointPen = this.map?.findObject(
      this.mapLayer?.object.id.things,
      (obj) => obj.name === this.mapLayer.object.name.spawnPen
    );
    const pen = new TrickSourceItem(this, spawnPointPen?.x as number, spawnPointPen?.y as number, GameImageKey.Pen);
    this.trickSourceItems.push(pen);

    super.addOverlapActionToItems();
  }

  private initThingsOfJoke(): void {
    const spawnPointPicture = this.map?.findObject(
      this.mapLayer?.object.id.things,
      (obj) => obj.name === this.mapLayer.object.name.spawnPicture
    );
    const picture = this.createTrickTargetItem({
      x: spawnPointPicture?.x as number,
      y: spawnPointPicture?.y as number,
      originalItemKey: GameImageKey.PictureBefore,
      trickedItemKey: GameImageKey.PictureAfter,
      actionItemKey: GameImageKey.Pen,
    });
    this.trickTargetItems.push(picture);
  }
}
