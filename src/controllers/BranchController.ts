import { NextFunction, Request, Response } from "express";
import FilterDTO from "../dtos/FilterDTO";
import { GenericResponse } from "../models/GenericResponse";
import BranchService from "../services/BranchService";

class BranchController {
  static async getBranches(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await BranchService.getBranches(new FilterDTO(req));
      res.send(
        new GenericResponse(200, "Branches retreived successfully", response)
      );
    } catch (error) {
      next(error);
    }
  }

  static async createBranch(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    try {
      const branch = await BranchService.createBranch(name);
      res.send(
        new GenericResponse(200, "Branches created successfully", {
          branch,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async modifyBranch(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const branch = await BranchService.modifyBranch(id, name);
      res.send(
        new GenericResponse(200, "Branches modified successfully", {
          branch,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async removeBranch(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await BranchService.removeBranch(id);
      res.send(new GenericResponse(200, "Branches removed successfully", {}));
    } catch (error) {
      next(error);
    }
  }
}

export default BranchController;
