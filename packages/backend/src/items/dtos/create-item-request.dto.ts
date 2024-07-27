import { IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { ItemRarity } from "../enums/item-rarity.enum";
import { ItemType } from "../enums/item-type.enum";

export class CreateItemRequestDto {
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @MaxLength(150)
  description: string;

  @IsEnum(ItemType)
  type: ItemType;

  @IsEnum(ItemRarity)
  rarity: ItemRarity;
}
