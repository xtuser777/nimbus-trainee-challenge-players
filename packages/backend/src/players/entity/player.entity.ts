import { Class } from '../enums/class.enum';

export interface Player {
  id: string; //UUID
  name: string;
  level: number;
  class: Class; //(Warrior, Mage, Knight, Cleric, Paladin, Druid e Ranger)
  created_at: string;
  updated_at: string;
}
