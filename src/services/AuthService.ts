import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import config from "../configs/config";
import { validate } from "class-validator";
/**
 * Class representing the Authentication service
 * @since version 1.0
 */
export class AuthService {
  /**
   * Method that checks if user with username is existing and if password is valid,
   * creating a token a if both checks are true
   * @param username user's username
   * @param password user's password
   */
  static async getUserToken(username: string, password: string) {
    const userRepository = getRepository(User);
    let user: User;
    user = await userRepository.findOneOrFail({ where: { username } });
    if (!user.isPasswordValid(password)) {
      throw new Error("Invalid Username or Password");
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    return token;
  }

  /**
   * Method that attempts to modify user's password, if @var(oldPassword) is valid
   * @param id user's id
   * @param oldPassword user's previous password
   * @param newPassword user's new requested password
   */
  static async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ) {
    const userRepository = getRepository(User);
    let user: User;
    user = await userRepository.findOneOrFail(id);
    if (!user.isPasswordValid(oldPassword)) {
      throw new Error("Invalid Username or Password");
    }
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error(errors[0].value);
    }
    user.hashPassword();
    return userRepository.save(user);
  }
}
