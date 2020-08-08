import { Length } from "class-validator";
import { validate } from "class-validator";
import ErrorHandler from "../models/ErrorHandler";
export const validateDTO = async (dto: any) => {
  const errors = await validate(dto);
  if (errors.length > 0) {
    throw new ErrorHandler(400, "Validation error", errors);
  }
  return true;
};
