import { GetResponseDto } from "../../shared/dtos/get-response.dto";
import { PlayerDto } from "./player.dto";

export class GetOnePlayerResponseDto extends GetResponseDto {
  public data: PlayerDto | undefined;

  constructor(status: number, success: boolean, data?: PlayerDto, message: string = '') {
    super(status, success, message);
    this.data = data;
  }
}
