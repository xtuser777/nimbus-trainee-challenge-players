import { GetResponseDto } from "src/shared/dtos/get-response.dto";
import { ItemDto } from "./item.dto";

export class GetOneItemResponseDto extends GetResponseDto {
  public data?: ItemDto;

  constructor(status: number, success: boolean, data?: ItemDto, message: string = '') {
    super(status, success, message);
    this.data = data;
  }
}
