import { ItemRarity } from "../enums/item-rarity.enum";
import { ItemType } from "../enums/item-type.enum";

export class CreateItemRequestDto {
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
}
