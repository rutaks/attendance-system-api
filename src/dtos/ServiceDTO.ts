import { IsDate, IsNotEmpty, Validate } from "class-validator";
import { IsBeforeConstraint } from "../decorators/IsBeforeContraint";

export class ServiceDTO {
  @IsNotEmpty({ message: "Service must have a title" })
  title: string;
  @IsDate({ message: "Service start Time is not valid" })
  @Validate(IsBeforeConstraint, ["endTime"])
  startTime: Date;
  @IsDate({ message: "Service end Time is not valid" })
  endTime: Date;
  @IsNotEmpty({ message: "Service must be under a church branch" })
  branchId: string;

  constructor(responseBody?: any) {
    this.title = responseBody.title;
    this.startTime = new Date(responseBody.startTime);
    this.endTime = new Date(responseBody.endTime);
    this.branchId = responseBody.branchId;
  }
}
