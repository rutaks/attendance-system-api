import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import ErrorHandler from "../models/ErrorHandler";

/**
 * Middleware function to intercept request and
 * check the user requesting access has ADMIN role,
 * otherwise it will revoke access to controller/route
 * @param roles String List representing the user roles
 */
export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
      if (roles.indexOf(user.role) > -1) next();
      else throw new ErrorHandler(404, `Invalid User Role`);
    } catch (error) {
      next(error);
    }
  };
};
