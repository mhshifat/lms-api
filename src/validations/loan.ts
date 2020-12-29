import Joi from "joi";

export const newLoanSchema: Record<
  string,
  Joi.StringSchema | Joi.NumberSchema
> = {
  book: Joi.string().required(),
  user: Joi.string().required(),
};

export const editLoanSchema: Record<
  string,
  Joi.StringSchema | Joi.NumberSchema
> = {
  returnDate: Joi.string().required(),
};
