import { GetResponseDto } from "src/shared/dtos/get-response.dto";
import { ItemDto } from "./item.dto";

export class GetAllItemsResponseDto extends GetResponseDto {
  public data: ItemDto[];
  private registers: number;

  constructor(status: number, success: boolean, data: ItemDto[], registers: number, message: string = '') {
    super(status, success, message);
    this.data = data;
    this.registers = registers;
  }
}
