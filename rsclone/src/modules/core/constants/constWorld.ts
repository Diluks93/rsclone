export const tile = 32;

export const sizeWorld = {
  width: 3840,
  height: 1536,
};

export const mapLayer = {
  platforms: 'platforms',
  bg: 'bg',
  bgWindow: 'bgWindow',
  bgDoors: 'bgDoors',
  object: {
    id: {
      ['object' as string]: 'object',
      ['things' as string]: 'things',
      ['neighbor' as string]: 'neighbor',
    },
    name: {
      ['spawnPlayer' as string]: 'spawn-point',
      ['spawnPen' as string]: 'pen',
      ['spawnPicture' as string]: 'picture',
      ['spawnNeighbor' as string]: 'spawn-neighbor',
    },
  },
};
