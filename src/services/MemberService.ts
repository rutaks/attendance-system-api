import { Fellowship } from "./../entity/Fellowship";
import { Member } from "./../entity/Member";
import ErrorHandler from "../models/ErrorHandler";
import { MemberDTO } from "./../dtos/MemberDTO";
class MemberService {
  static async createMember(memberDTO: MemberDTO) {
    if (!memberDTO.email && !memberDTO.phoneNumber) {
      throw new ErrorHandler(400, "Provide a phone number or email");
    }
    try {
      let member = new Member();
      member.firstName = memberDTO.firstName;
      member.lastName = memberDTO.lastName;
      member.email = memberDTO.email;
      member.phoneNumber = memberDTO.phoneNumber;
      member.nationalId = memberDTO.nationalId;
      member.passportId = memberDTO.passportId;

      if (memberDTO.fellowshipId) {
        member.fellowship = await Fellowship.findOneOrFail(
          memberDTO.fellowshipId
        );
      }
      return await member.save();
    } catch (error) {
      throw new ErrorHandler(400, "Could not create member", error);
    }
  }
}

export default MemberService;
