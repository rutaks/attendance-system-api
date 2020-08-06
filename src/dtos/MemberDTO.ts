import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";
export class MemberDTO {
  @IsNotEmpty({ message: "First Name can not be empty" })
  firstName: string;
  @IsNotEmpty({ message: "Last Name can not be empty" })
  lastName: string;
  @IsOptional()
  @IsPhoneNumber("RW", { message: "Provide a valid phone number" })
  phoneNumber: string;
  @IsOptional()
  @IsEmail()
  email: string;
  nationalId: string;
  passportId: string;
  fellowshipId: number;

  constructor(responseBody?: any) {
    this.firstName = responseBody.firstName;
    this.lastName = responseBody.lastName;
    this.phoneNumber = responseBody.phoneNumber;
    this.email = responseBody.email;
    this.nationalId = responseBody.nationalId;
    this.passportId = responseBody.passportId;
    this.fellowshipId = responseBody.fellowshipId;
  }
}
