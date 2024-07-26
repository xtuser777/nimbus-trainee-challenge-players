import { CreateResponseDto } from "../../shared/dtos/create-response.dto";

export class DeletePlayerResponseDto extends CreateResponseDto {
  public affectedRows: number;

  constructor(status: number, success:boolean, message:string, affectedRows: number) {
    super(status, success, message);
    this.affectedRows = affectedRows;
  }
}
