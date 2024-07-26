import { CreateResponseDto } from "src/shared/dtos/create-response.dto";

export class CreatePlayerItemResponseDto extends CreateResponseDto {

  constructor(status: number, success:boolean, message:string) {
    super(status, success, message);
  }
}
