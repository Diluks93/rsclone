const tile = 32;

const sizeWorld = {
  width: 3840,
  height: 1536,
};

const mapLayer = {
  platforms: 'platforms',
  bg: 'bg',
  bgWindow: 'bgWindow',
  bgDoors: 'bgDoors',
  object: {
    id: 'object',
    name: 'spawn-point',
  },
};

export { tile, sizeWorld, mapLayer }