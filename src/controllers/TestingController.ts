import { GenericResponse } from "./../models/GenericResponse";
import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
class TestingController {
  static test(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(new GenericResponse(200, "Access Granted"));
  }
}

export default TestingController;
