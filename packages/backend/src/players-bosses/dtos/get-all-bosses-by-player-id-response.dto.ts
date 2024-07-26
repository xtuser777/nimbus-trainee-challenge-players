import { BossDto } from "src/bosses/dtos/boss.dto";
import { GetResponseDto } from "src/shared/dtos/get-response.dto";

export class GetAllBossesByPlayerIdResponseDto extends GetResponseDto {
  private data: BossDto[];
  private registers: number;

  constructor(status: number, success: boolean, registers: number, data?: BossDto[], message: string = '') {
    super(status, success, message);
    this.data = data;
    this.registers = registers;
  }
}
