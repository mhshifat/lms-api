import { NextFunction, Request, Response } from "express";
import { env } from "../config";
import { capFirstLetterInWord } from "../helpers";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(
    `Requested route '${req.originalUrl}' does not exists 😢`
  );
  res.status(404);
  next(error);
};

export const errMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code =
    res.statusCode !== 200 ? res.statusCode : (err as any).isJoi ? 422 : 500;

  return res.status(code).json({
    success: false,
    error: {
      errorCode: code,
      message: (err as any).isJoi ? "Invalid Inputs" : err.message,
      ...((err as any).isJoi
        ? {
            errors: (err as any).details.map((obj: any) => ({
              message: obj.message.replace(
                /"([^"]*)"/g,
                capFirstLetterInWord(obj.path[0])
              ),
              path: obj.path[0],
            })),
          }
        : {}),
      ...(!env.inProd ? { stack: err.stack, requestUrl: req.originalUrl } : {}),
    },
  });
};
