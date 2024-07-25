import { ItemRarity } from "../enums/item-rarity.enum";
import { ItemType } from "../enums/item-type.enum";

export class CreateItemDto {
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
}
