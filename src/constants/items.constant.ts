import { ItemType } from '../types/items.type';

export const MINIMUM_QUALITY = 0;
export const MAXIMUM_QUALITY = 25;
export const DEFAULT_EXPIRY_IN_DAYS = 5;

export const REGEX_ORGANIC_ITEM_TYPE_VARIABLE = `\\b(${ItemType.Organic})\\b`;

export const REGEX_ORGANIC_ITEM_TYPE = new RegExp(
  REGEX_ORGANIC_ITEM_TYPE_VARIABLE,
  'ig'
);
