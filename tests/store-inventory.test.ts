import { StoreInventory } from '../src/store-inventory';
import { expect } from 'chai';
import {
  MOCK_CHEDDAR_CHEESE_ITEM,
  MOCK_COMMON_ITEMS,
  MOCK_INSTANT_RAMEN_ITEM,
  MOCK_ORGANIC_ITEM,
} from '../src/mocks/items.mock';
import ItemFactory from '../src/factory/item-factory';

let quality;
let sellIn;

const printStoreInventoryAfterDays = (store: StoreInventory, days: number) => {
  for (let i = 0; i < days; i++) {
    console.log('Day ' + i + '  ---------------------------------');
    console.log('            name sellIn quality expiry');
    console.table(store.toString());

    console.log();
    store.updateQuality();
  }
};

describe('Common Item', () => {
  it('log and print store inventory', () => {
    quality = 10;
    sellIn = 10;

    const storeInventory = new StoreInventory([
      ...MOCK_COMMON_ITEMS,
      ...MOCK_CHEDDAR_CHEESE_ITEM,
      ...MOCK_INSTANT_RAMEN_ITEM,
      ...MOCK_ORGANIC_ITEM,
    ]);
    printStoreInventoryAfterDays(storeInventory, 2);
    expect(storeInventory.toString().length).to.be.eq(6);
  });

  it('should decrease sellIn value and quality', () => {
    quality = 10;
    sellIn = 10;

    const storeInventory = new StoreInventory([
      ItemFactory.create('Apple', sellIn, quality),
    ]);
    const items = storeInventory.updateQuality();
    expect(items[0].quality).to.be.eq(9);
    expect(items[0].sellIn).to.be.eq(9);
    expect(items[0].name).to.be.eq('Apple');
  });

  it('quality cannot be negative', () => {
    quality = 0;
    sellIn = 10;

    const storeInventory = new StoreInventory([
      ItemFactory.create('Banana', sellIn, quality),
    ]);
    const items = storeInventory.updateQuality();
    expect(items[0].name).to.be.eq('Banana');
    expect(items[0].quality).to.be.eq(0);
  });

  it('should degrade quality by 2 if sellIn is equal or less than 0', () => {
    quality = 10;
    sellIn = 0;

    const storeInventory = new StoreInventory([
      ItemFactory.create('Strawberry', sellIn, quality),
    ]);
    const items = storeInventory.updateQuality();
    expect(items[0].quality).to.be.eq(8);
    expect(items[0].name).to.be.eq('Strawberry');
  });

  it('should remove item if sellIn is default 5 days past its sellIn date', () => {
    quality = 10;
    sellIn = -4;

    const storeInventory = new StoreInventory([
      ItemFactory.create('Kiwi', sellIn, quality),
    ]);
    expect(storeInventory.toString().length).to.be.eq(1);
    printStoreInventoryAfterDays(storeInventory, 1);
    expect(storeInventory.toString().length).to.be.eq(0);
  });

});

describe('Cheddar Cheese', () => {
  it('should increase quality when update', () => {
    quality = 10;
    sellIn = 10;

    const storeInventory = new StoreInventory([
      ItemFactory.create('Cheddar Cheese', sellIn, quality),
    ]);
    const items = storeInventory.updateQuality();
    expect(items[0].quality).to.be.eq(11);
    expect(items[0].name).to.be.eq('Cheddar Cheese');
  });

  it('should not increase quality more than 25 when update', () => {
    quality = 25;
    sellIn = 10;

    const storeInventory = new StoreInventory([
      ItemFactory.create('Cheddar Cheese', sellIn, quality),
    ]);
    const items = storeInventory.updateQuality();
    expect(items[0].quality).to.be.eq(25);
    expect(items[0].name).to.be.eq('Cheddar Cheese');
  });
});

describe('Instant Ramen', () => {
  it('should never decreases quality when update', () => {
    quality = 25;
    sellIn = 10;

    const storeInventory = new StoreInventory([
      ItemFactory.create('Instant Ramen', sellIn, quality),
    ]);
    const items = storeInventory.updateQuality();
    expect(items[0].quality).to.be.eq(25);
    expect(items[0].sellIn).to.be.eq(9);
    expect(items[0].name).to.be.eq('Instant Ramen');
  });
});

describe('Organic Item', () => {
  it('should decrease quality by 2 when update', () => {
    quality = 20;
    sellIn = 0;

    const storeInventory = new StoreInventory([
      ItemFactory.create('Organic Avocado', sellIn, quality),
    ]);
    const items = storeInventory.updateQuality();
    expect(items[0].quality).to.be.eq(18);
    expect(items[0].name).to.be.eq('Organic Avocado');
  });

  it('should remove item if sellIn is custom 1 days past its sellIn date', () => {
    quality = 10;
    sellIn = 0;
    let expiry = 1;

    const storeInventory = new StoreInventory([
      ItemFactory.create('Organic Papayas', sellIn, quality, expiry),
    ]);
    expect(storeInventory.toString().length).to.be.eq(1);
    const items = storeInventory.updateQuality();
    expect(storeInventory.toString().length).to.be.eq(0);
    expect(items.length).to.be.eq(0);
  });
});
