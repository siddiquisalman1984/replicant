import { REGEX_ORGANIC_ITEM_TYPE } from '../constants/items.constant';
import CheddarCheeseItem from '../models/cheddar-cheese-item';
import CommonItem from '../models/common-item';
import InstantRamenItem from '../models/instant-ramen-item';
import { Item } from '../models/item';
import OrganicItem from '../models/organic-item';
import { ItemType } from '../types/items.type';

export default class ItemFactory {
  static create(
    name: string,
    sellIn: number,
    quality: number,
    expiry?: number
  ): Item {
    if (name === ItemType.CheddarCheese) {
      return new CheddarCheeseItem(name, sellIn, quality, expiry);
    } else if (name === ItemType.InstantRamen) {
      return new InstantRamenItem(name, sellIn, quality, expiry);
    } else if (name.match(REGEX_ORGANIC_ITEM_TYPE)) {
      return new OrganicItem(name, sellIn, quality, expiry);
    } else {
      return new CommonItem(name, sellIn, quality, expiry);
    }
  }
}
