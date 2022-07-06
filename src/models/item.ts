import {
  DEFAULT_EXPIRY_IN_DAYS,
  MAXIMUM_QUALITY,
  MINIMUM_QUALITY,
} from '../constants/items.constant';

export abstract class Item {
  private _name: string;
  private _sellIn: number;
  private _quality: number;
  private _expiry: number;

  constructor(
    name: string,
    sellIn: number,
    quality: number,
    expiry: number = DEFAULT_EXPIRY_IN_DAYS
  ) {
    this._name = name;
    this._sellIn = sellIn;
    this._quality = quality;
    this._expiry = expiry;
  }

  public get name(): string {
    return this._name;
  }

  public get sellIn(): number {
    return this._sellIn;
  }

  public get quality(): number {
    return this._quality;
  }

  public get expiry(): number {
    return this._expiry;
  }

  protected decreaseQuality() {
    this.isGreaterThanMinimumQuality() ? this._quality-- : this._quality;
  }

  protected increaseQuality() {
    this.isLesserThanMaximumQuality() ? this._quality++ : this._quality;
  }

  protected decreaseSellIn() {
    this._sellIn--;
  }

  private isLesserThanMaximumQuality() {
    return this._quality < MAXIMUM_QUALITY;
  }

  private isGreaterThanMinimumQuality() {
    return this._quality > MINIMUM_QUALITY;
  }

  public isExpired() {
    return this._sellIn <= -Math.abs(this._expiry);
  }

  abstract update(): void;
}
