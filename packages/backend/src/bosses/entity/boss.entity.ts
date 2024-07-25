import { Difficulty } from "../enums/difficulty.enum";

export type Boss = {
  id: string; //UUID
	name: string;
	difficulty: Difficulty; //(Easy, Medium, Hard e Very Hard)
	created_at: string;
	updated_at: string;
};
