import { IsNotEmpty, MaxLength, IsEnum } from "class-validator";
import { Class } from "../enums/class.enum";

export class UpdatePlayerRequestDto {
  @IsNotEmpty()
  @MaxLength(150)
  name: string;
  
  @IsEnum(Class)
  class: Class;
}
