import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../models/GenericResponse";
import FellowshipService from "../services/FellowshipService";

class FellowshipController {
  static async getFellowships(req: Request, res: Response, next: NextFunction) {
    const fellowships = await FellowshipService.getFellowships();
    res.send(
      new GenericResponse(200, "Fellowships retreived successfully", {
        content: fellowships,
      })
    );
  }
}

export default FellowshipController;
