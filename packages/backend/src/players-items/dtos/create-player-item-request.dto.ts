import { IsInt, Min } from "class-validator";

export class CreatePlayerItemRequestDto {
  @IsInt()
  @Min(1)
  quantity: number;
}
