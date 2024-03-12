import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error";
import { Errors } from "../types/types";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.status).send({message: err.message, errors: err.errors});
  }

  return res.status(500).send({message: Errors.Server});
}