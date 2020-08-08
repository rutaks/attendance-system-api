import * as dotenv from "dotenv";
dotenv.config();
/**
 * Constant value holding env variables to reduce overhead variable request
 * from process.env
 */
export default {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  encryptKey: process.env.ENCRYPT_KEY,
};
