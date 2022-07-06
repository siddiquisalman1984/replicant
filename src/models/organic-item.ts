import { Item } from './item';

export default class OrganicItem extends Item {
  constructor(name: string, sellIn: number, quality: number, expiry?: number) {
    super(name, sellIn, quality, expiry);
  }

  update(): void {
    this.decreaseQuality();
    this.decreaseQuality();
    this.decreaseSellIn();
  }
}
