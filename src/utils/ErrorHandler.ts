import { Response } from "express";

export const handleError = (err: any, res: Response) => {
  const { statusCode, message, error } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    error,
  });
};
