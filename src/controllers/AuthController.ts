import { AuthService } from "./../services/AuthService";
import { GenericResponse } from "./../models/GenericResponse";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../models/ErrorHandler";

/**
 * Class representing the authentication controller
 * @since version 1.0
 */
class AuthController {
  /**
   * Controller to process login requests
   * @param req Express request
   * @param res Express response
   */
  static async login(req: Request, res: Response, next: NextFunction) {
    let { username, password } = req.body;
    if (!(username && password)) {
      throw new ErrorHandler(400, "Provide Username & Password", {});
    }
    try {
      let { user, token } = await AuthService.getUserToken(username, password);
      res.send(new GenericResponse(400, "Login successful", { user, token }));
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
