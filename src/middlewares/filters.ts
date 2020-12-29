import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateReqBodyMiddleware = (schema: Object) => (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  Joi.object(schema)
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => next(err));
