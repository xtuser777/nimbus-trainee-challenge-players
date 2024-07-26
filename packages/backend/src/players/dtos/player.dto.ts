import { Player } from "../entity/player.entity";
import { Class } from "../enums/class.enum";

export class PlayerDto {
  public id: string; //UUID
  public name: string;
  public level: number;
  public className: Class;

  constructor(player: Player) {
    this.id = player.id;
    this.name = player.name;
    this.level = player.level;
    this.className = player.class;
  }
}
