import Joi from "joi";

export const newBookSchema: Record<
  string,
  Joi.StringSchema | Joi.NumberSchema
> = {
  title: Joi.string().required(),
  author: Joi.string().required(),
  image: Joi.string().required(),
  numOfCopies: Joi.number().required(),
};

export const editBookSchema: Record<
  string,
  Joi.StringSchema | Joi.NumberSchema
> = {
  _id: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  image: Joi.string().required(),
  numOfCopies: Joi.number().required(),
};
