import { GenericResponse } from "./../models/GenericResponse";
import { MemberDTO } from "./../dtos/MemberDTO";
import { NextFunction, Response } from "express";
import { Request } from "express";
import { validateDTO } from "../utils/validateDTO";
import MemberService from "../services/MemberService";
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

  static async getMembers(req: Request, res: Response, next: NextFunction) {
    try {
      let page = (req.query.page || 0).toString();
      let size = (req.query.size || 10).toString();
      const { members, totalCount } = await MemberService.getMembers(
        size,
        page
      );
      res.send(
        new GenericResponse(200, "Members retreived successfully", {
          members,
          totalCount,
        })
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default MemberController;
