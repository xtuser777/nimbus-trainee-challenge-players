import { Class } from "../enums/class.enum";

export class CreatePlayerRequestDto {
  name: string;
  level: number;
  class: Class;
}
