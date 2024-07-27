import { IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { Difficulty } from "../enums/difficulty.enum";

export class CreateBossRequestDto {
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsEnum(Difficulty)
	difficulty: Difficulty;
}
