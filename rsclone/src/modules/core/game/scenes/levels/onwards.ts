import GameScene from './gameScene';
import Neighbor from '../../entities/neighbor';
import TrickSourceItem from '../../helpers/trickSourceItem';

import { FrameKey, GameKey, SceneKey } from '../../../enums/enums';
import Player from '../../entities/player';

export default class Onwards extends GameScene {
  protected neighbor!: Neighbor;

  pen: Phaser.GameObjects.Image | undefined;

  constructor() {
    super({ key: SceneKey.Onwards });
  }

  create() {
    super.create();
    this.initNeighbor();
    this.initThingsOfJoke();
    this.initThings();
  }

  private initNeighbor(): void {
    const spawnPointNeighbor = this.map?.findObject(
      this.mapLayer?.object.id.neighbor,
      (obj) => obj.name === this.mapLayer.object.name.spawnNeighbor
    );
    this.neighbor = new Neighbor(
      this,
      spawnPointNeighbor?.x as number,
      spawnPointNeighbor?.y as number,
      GameKey.Neighbor,
      this.player,
      FrameKey.NeighborFrontMiddle
    );
    this.physics.add.collider(this.player, this.neighbor, (player, neighbor) => {
      (player as Player).getDamage(1);
    });
    this.physics.add.collider(this.neighbor, this.floor as Phaser.Tilemaps.TilemapLayer);
  }

  private initThings(): void {
    const spawnPointPen = this.map?.findObject(
      this.mapLayer?.object.id.things,
      (obj) => obj.name === this.mapLayer.object.name.spawnPen
    );
    const pen = new TrickSourceItem(this, spawnPointPen?.x as number, spawnPointPen?.y as number, GameKey.Pen);
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
      originalItemKey: GameKey.Picture,
      trickedItemKey: GameKey.TrickedPicture,
      actionItemKey: GameKey.Pen,
    });
    this.trickTargetItems.push(picture);
  }
}
