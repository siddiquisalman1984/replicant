import { Item } from './item';

export default class CommonItem extends Item {
  constructor(name: string, sellIn: number, quality: number, expiry?: number) {
    super(name, sellIn, quality, expiry);
  }

  update(): void {
    this.decreaseQuality();
    if (this.sellIn <= 0) {
      this.decreaseQuality();
    }

    this.decreaseSellIn();
  }
}
