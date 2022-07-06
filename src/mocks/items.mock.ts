import ItemFactory from '../factory/item-factory';

export const MOCK_COMMON_ITEMS = [
  ItemFactory.create('Apple', 10, 10),
  ItemFactory.create('Banana', 10, 0),
  ItemFactory.create('Strawberry', 5, 10),
];
export const MOCK_CHEDDAR_CHEESE_ITEM = [
  ItemFactory.create('Cheddar Cheese', 10, 16),
];
export const MOCK_INSTANT_RAMEN_ITEM = [
  ItemFactory.create('Instant Ramen', 0, 5),
];
export const MOCK_ORGANIC_ITEM = [ItemFactory.create('Organic Avocado', 5, 16)];
