import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { nextTick } from "process";
import config from "../configs/config";
import ErrorHandler from "../models/ErrorHandler";

/**
 * Middleware function to intercept request and check if jwt was assigned
 * with the request, if no jwt found, it will revoke access to controller/route
 * @param req Express request
 * @param res Express response
 * @param next NextFunction to continue processes
 */
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["authorization"];
  let jwtPayload: any;
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
      expiresIn: "1h",
    });
    res.setHeader("token", newToken);
    next();
  } catch (error) {
    throw new ErrorHandler(500, `Could obtain JWT ${error}`);
  }
};
