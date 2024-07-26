import { GetResponseDto } from "src/shared/dtos/get-response.dto";
import { BossDto } from "./boss.dto";

export class GetOneBossResponseDto extends GetResponseDto {
  public data?: BossDto;

  constructor(status: number, success: boolean, data?: BossDto, message: string = '') {
    super(status, success, message);
    this.data = data;
  }
}
