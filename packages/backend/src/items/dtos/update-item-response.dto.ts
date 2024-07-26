import { CreateResponseDto } from "src/shared/dtos/create-response.dto";

export class UpdateItemResponseDto extends CreateResponseDto {
  public affectedRows: number;

  constructor(status: number, success:boolean, message:string, affectedRows: number) {
    super(status, success, message);
    this.affectedRows = affectedRows;
  }
}
