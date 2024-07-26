import { Boss } from "../entity/boss.entity";
import { Difficulty } from "../enums/difficulty.enum";

export class BossDto {
  id: string;
	name: string;
	difficulty: Difficulty;

  constructor(boss: Boss) {
    this.id = boss.id;
    this.name = boss.name;
    this.difficulty = boss.difficulty;
  }
}
