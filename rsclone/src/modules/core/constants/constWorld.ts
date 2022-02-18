import { MapLayerType } from './../types/types';
export const tile = 32;

export const sizeWorld = {
  width: 3840,
  height: 1536,
};

export const mapLayer: MapLayerType = {
  platforms: 'platforms',
  bg: 'bg',
  bgWindow: 'bgWindow',
  bgDoors: 'bgDoors',
  object: {
    id: {
      object: 'object',
      things: 'things',
      neighbor: 'neighbor',
    },
    name: {
      spawnPlayer: 'spawn-point',
      spawnPen: 'pen',
      spawnPicture: 'picture',
      spawnNeighbor: 'spawn-neighbor',
    },
  },
};
