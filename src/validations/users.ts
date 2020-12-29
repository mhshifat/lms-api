import Joi from "joi";

export const newUserSchema: Record<string, Joi.StringSchema> = {
  email: Joi.string()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  mobileNumber: Joi.string().required(),
  avatar: Joi.string().allow("").optional(),
  role: Joi.string().allow("").optional(),
};

export const editUserSchema: Record<string, Joi.StringSchema> = {
  _id: Joi.string().required(),
  email: Joi.string()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  mobileNumber: Joi.string().required(),
  avatar: Joi.string().allow("").optional(),
  role: Joi.string().allow("").optional(),
};
