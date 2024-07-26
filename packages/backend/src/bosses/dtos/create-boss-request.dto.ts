import { Difficulty } from "../enums/difficulty.enum";

export class CreateBossRequestDto {
  name: string;
	difficulty: Difficulty;
}
