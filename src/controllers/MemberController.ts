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
}

export default MemberController;
