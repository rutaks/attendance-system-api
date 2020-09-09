import { GenericResponse } from "./../models/GenericResponse";
import { MemberDTO } from "./../dtos/MemberDTO";
import { NextFunction, Response } from "express";
import { Request } from "express";
import { validateDTO } from "../utils/validateDTO";
import MemberService from "../services/MemberService";
import FilterDTO from "../dtos/FilterDTO";
/**
 * Class representing the member operation controller
 * @since version 1.0
 */
class MemberController {
  static async createMember(req: Request, res: Response, next: NextFunction) {
    const memberDTO = new MemberDTO(req.body);
    try {
      await validateDTO(memberDTO);
      const member = await MemberService.createMember(memberDTO);
      res.send(
        new GenericResponse(200, "Member creation successful", { member })
      );
    } catch (error) {
      next(error);
    }
  }

  static async modifyMember(req: Request, res: Response, next: NextFunction) {
    try {
      const memberDTO = new MemberDTO(req.body);
      const { memberId } = req.params;
      await validateDTO(memberDTO);
      const member = await MemberService.modifyMember(memberId, memberDTO);
      res.send(
        new GenericResponse(200, "Member modification successful", { member })
      );
    } catch (error) {
      next(error);
    }
  }

  static async removeMember(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId } = req.params;
      await MemberService.removeMember(memberId);
      res.send(
        new GenericResponse(200, "Member removed successfully", { memberId })
      );
    } catch (error) {
      next(error);
    }
  }

  static async getMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, paged } = await MemberService.getMembers(
        new FilterDTO(req)
      );
      res.send(
        new GenericResponse(200, "Members retreived successfully", {
          content,
          paged,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async getMemberById(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId } = req.params;
      const member = await MemberService.getMemberById(memberId);
      res.send(
        new GenericResponse(200, "Member retreived successfully", { member })
      );
    } catch (error) {
      next(error);
    }
  }
}

export default MemberController;
