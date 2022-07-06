import { Item } from './item';

export default class InstantRamenItem extends Item {
  constructor(name: string, sellIn: number, quality: number, expiry?: number) {
    super(name, sellIn, quality, expiry);
  }

  update(): void {
    this.decreaseSellIn();
  }
}
