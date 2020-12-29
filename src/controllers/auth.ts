import { Request, Response } from "express";
import { env } from "../config";
import {
  generateToken,
  generateUserPayload,
  responseHandler,
} from "../helpers";
import { AuthServices, UserServices } from "../services";
import { LoginInputs, RegisterInputs, TokenLoginInputs } from "../types/auth";
import { UserRoleEnum } from "../types/user";

export const register = async (req: Request, res: Response) => {
  const { email } = req.body as RegisterInputs;
  await AuthServices.isUserExist({
    res,
    query: { email },
  });
  await UserServices.createUser({
    user: { ...req.body, role: UserRoleEnum.Librarian },
  });
  return responseHandler(res, 200, {});
};

export const login = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body as LoginInputs;
  const user = await UserServices.isUserExist({
    res,
    query: { email },
    message: "Wrong credentials",
  });

  await AuthServices.isPwdMatched({
    res,
    password,
    hashPassword: user.password,
  });
  user.set({ rememberMe: !!rememberMe });
  await user.save();
  const userPayload = generateUserPayload(user);
  const token = generateToken({
    payload: userPayload,
    secret: env.jwt.secret + user.password,
    expiresIn: rememberMe ? "7d" : "1d",
  });

  return responseHandler(res, 200, {
    token,
    userPayload,
  });
};

export const tokenLogin = async (req: Request, res: Response) => {
  const { token } = req.body as TokenLoginInputs;
  const user = await AuthServices.validateAccessToken({
    res,
    token,
  });
  const userPayload = generateUserPayload(user);

  return responseHandler(res, 200, {
    userPayload,
  });
};
