import { Item } from './models/item';

export class StoreInventory {
  private items: Item[] = [];

  constructor(items: Array<Item>) {
    this.items = items;
  }

  updateQuality(): readonly Item[] {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update();
      this.removeExpiredItem(i);
    }
    return this.items;
  }

  private removeExpiredItem(index: number) {
    if (this.items[index].isExpired()) {
      this.items.splice(index, 1);
    }
  }

  toString(): (string | number)[][] {
    return this.items.map((element) => {
      return [element.name, element.sellIn, element.quality, element.expiry];
    });
  }
}
