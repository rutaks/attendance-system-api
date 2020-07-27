import { AuthService } from "./../services/AuthService";
import { GenericResponse } from "./../models/GenericResponse";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../models/ErrorHandler";

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    let { username, password } = req.body;
    if (!(username && password)) {
      throw new ErrorHandler(400, "Provide Username & Password");
    }
    try {
      let token: string = await AuthService.getUserToken(username, password);
      res.send(new GenericResponse(200, "Login successful", { token }));
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
