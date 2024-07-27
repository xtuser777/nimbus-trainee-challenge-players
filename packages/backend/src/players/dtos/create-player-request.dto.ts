import { IsEnum, IsInt, IsNotEmpty, IsPositive, Max, MaxLength, Min } from "class-validator";
import { Class } from "../enums/class.enum";

export class CreatePlayerRequestDto {
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsEnum(Class)
  class: Class;
}
