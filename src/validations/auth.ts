import Joi from "joi";
import { LoginInputs, RegisterInputs, TokenLoginInputs } from "../types/auth";

export const loginInputSchema: Record<
  keyof LoginInputs,
  Joi.StringSchema | Joi.BooleanSchema
> = {
  email: Joi.string()
    .lowercase()
    .email({ tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().min(4).required(),
  rememberMe: Joi.boolean().optional(),
};

export const registerInputSchema: Record<
  keyof RegisterInputs,
  Joi.StringSchema
> = {
  email: Joi.string()
    .lowercase()
    .email({ tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().min(4).required(),
};

export const tokenLoginInputSchema: Record<
  keyof TokenLoginInputs,
  Joi.StringSchema
> = {
  token: Joi.string().required(),
};
