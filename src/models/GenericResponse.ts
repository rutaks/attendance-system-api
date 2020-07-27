export class GenericResponse {
  private statusCode: number;
  private message: string;
  private body: any;
  constructor(statusCode: number, message: string, body?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.body = body || {};
  }
}
