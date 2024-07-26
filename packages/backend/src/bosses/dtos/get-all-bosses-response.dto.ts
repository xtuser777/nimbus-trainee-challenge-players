import { GetResponseDto } from "src/shared/dtos/get-response.dto";
import { BossDto } from "./boss.dto";

export class GetAllBossesResponseDto extends GetResponseDto {
  private data: BossDto[];
  private registers: number;

  constructor(status: number, success: boolean, registers: number, data?: BossDto[], message: string = '') {
    super(status, success, message);
    this.data = data;
    this.registers = registers;
  }
}
