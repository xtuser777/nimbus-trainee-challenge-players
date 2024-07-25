import { ItemRarity } from "../enums/item-rarity.enum";
import { ItemType } from "../enums/item-type.enum";

export type Item = {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  created_at: string;
  updated_at: string;
};
