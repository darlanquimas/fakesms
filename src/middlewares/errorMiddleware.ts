import { ApiError } from "../errors/ApiError";
import { NextFunction, Request, Response } from "express";
import { format } from "date-fns";

export const errorMiddleware = (
  error: Error & ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  const dateTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");

  const dataResponse = { dateTime: dateTime };

  if (process.env.ENVIRONMENT === "PRODUCTION") {
    Object.assign(dataResponse, { message: "Internal Server Error" });
  } else {
    Object.assign(dataResponse, {
      message: `${
        error.message || "Internal Server Error, exception not maped"
      }`,
    });
    Object.assign(dataResponse, { enviromnent: "DEVELOPMENT" });
  }

  const lineSeparator = "__________________________________";

  console.error(lineSeparator);
  console.log("Erro", error.stack);

  return response.status(statusCode).json(dataResponse);
};
