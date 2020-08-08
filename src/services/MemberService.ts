import { Fellowship } from "./../entity/Fellowship";
import { Member } from "./../entity/Member";
import ErrorHandler from "../models/ErrorHandler";
import { MemberDTO } from "./../dtos/MemberDTO";
import { Branch } from "../entity/Branch";
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

      if (memberDTO.branchId) {
        member.branch = await Branch.findOneOrFail(memberDTO.branchId);
      }

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

  static async modifyMember(memberId: string, memberDTO: MemberDTO) {
    if (!memberDTO.email && !memberDTO.phoneNumber) {
      throw new ErrorHandler(400, "Provide a phone number or email");
    }
    try {
      let member = await Member.findOneOrFail(memberId);
      member.firstName = memberDTO.firstName;
      member.lastName = memberDTO.lastName;
      member.email = memberDTO.email;
      member.phoneNumber = memberDTO.phoneNumber;
      member.nationalId = memberDTO.nationalId;
      member.passportId = memberDTO.passportId;

      if (memberDTO.branchId) {
        member.branch = await Branch.findOneOrFail(memberDTO.branchId);
      }

      if (memberDTO.fellowshipId) {
        member.fellowship = await Fellowship.findOneOrFail(
          memberDTO.fellowshipId
        );
      }
      return await member.save();
    } catch (error) {
      throw new ErrorHandler(400, "Could not modify member", error);
    }
  }

  static async removeMember(memberId: string) {
    try {
      const { affected } = await Member.delete(memberId);
      if (affected === 0) {
        throw new Error("Entity not found");
      }
      return memberId;
    } catch (error) {
      throw new ErrorHandler(400, `Could not modify member ${error}`);
    }
  }

  static async getMembers(sizeStr: string = "10", pageStr: string = "0") {
    const size = parseInt(sizeStr);
    const page = parseInt(pageStr);
    const members = await Member.find({ skip: page, take: size });
    const totalCount = await Member.count({});
    return { members, totalCount };
  }
}

export default MemberService;
