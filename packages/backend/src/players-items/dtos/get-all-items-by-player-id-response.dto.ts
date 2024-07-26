import { ItemDto } from "src/items/dtos/item.dto";
import { GetResponseDto } from "src/shared/dtos/get-response.dto";

export class GetAllItemsByPlayerIdResponseDto extends GetResponseDto {
  private data: ItemDto[];
  private registers: number;

  constructor(status: number, success: boolean, registers: number, data?: ItemDto[], message: string = '') {
    super(status, success, message);
    this.data = data;
    this.registers = registers;
  }
}
