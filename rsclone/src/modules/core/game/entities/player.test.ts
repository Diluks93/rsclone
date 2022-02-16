/**
 * @jest-environment jsdom
 */

import FirstSteps from '../scenes/levels/firstSteps';
import { Player } from './player';

class PlayerConsumer {
  scene = new FirstSteps();

  player;

  constructor() {
    this.player = new Player(this.scene, 1, 1, 'test');
  }

  getDamage(): void {
    this.player.getDamage(1);
  }
}

jest.mock('./player');

describe('PlayerConsumer', () => {
  const MockedPlayer = Player as jest.MockedClass<typeof Player>;

  beforeEach(() => {
    MockedPlayer.mockClear();
  });

  it('We can check if the consumer called the class constructor', () => {
    new PlayerConsumer();
    expect(MockedPlayer).toHaveBeenCalledTimes(1);
  });

  it('We can check if the consumer called a method on the class instance', () => {
    expect(MockedPlayer).not.toHaveBeenCalled();
    const playerConsumer = new PlayerConsumer();
    expect(MockedPlayer).toHaveBeenCalledTimes(1);
    playerConsumer.getDamage();
    expect(MockedPlayer.prototype.getDamage).toHaveBeenCalledWith(1);
    expect(MockedPlayer.prototype.getDamage).toHaveBeenCalledTimes(1);
  });
});
