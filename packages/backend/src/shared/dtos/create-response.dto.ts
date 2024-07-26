export class CreateResponseDto {
  private status: number;
  private success: boolean;
  private message: string;

  constructor(status: number, success:boolean, message:string) {
    this.status = status;
    this.success = success;
    this.message = message;
  }
}
