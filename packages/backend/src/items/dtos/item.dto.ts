import { Item } from "../entity/item.entity";
import { ItemRarity } from "../enums/item-rarity.enum";
import { ItemType } from "../enums/item-type.enum";

export class ItemDto {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;

  constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.type = item.type;
    this.rarity = item.rarity;
  }
}
