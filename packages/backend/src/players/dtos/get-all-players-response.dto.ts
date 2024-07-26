import { GetResponseDto } from "../../shared/dtos/get-response.dto";
import { PlayerDto } from "./player.dto";

export class GetAllPlayersResponseDto extends GetResponseDto {
  private data: PlayerDto[];
  private registers: number;

  constructor(status: number, success: boolean, registers: number, data?: PlayerDto[], message: string = '') {
    super(status, success, message);
    this.data = data;
    this.registers = registers;
  }
}
