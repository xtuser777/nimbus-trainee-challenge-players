export abstract class GetResponseDto {
  public status: number;
  public success: boolean;
  public message: string;

  constructor(status: number, success: boolean, message: string) {
    this.status = status;
    this.success = success;
    this.message = message;
  }
}
