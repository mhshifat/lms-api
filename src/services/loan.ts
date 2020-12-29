import { Response } from "express";
import { LoanModel } from "../models";
import { LoanDocument } from "../types/loan";

export const isLoanFound = async ({
  query,
  res,
  message,
}: {
  query: Object;
  res: Response;
  message?: string;
}) => {
  const loan = await LoanModel.findOne(query);
  if (loan) {
    res.statusCode = 409;
    throw new Error("Loan already exist");
  }
  return loan;
};

export const createLoan = async ({ loan }: { loan: LoanDocument }) => {
  return await LoanModel.create(loan);
};

export const getLoans = async (query: object) => {
  return await LoanModel.find(query)
    .select("-__v")
    .populate("book")
    .populate("user");
};

export const getLoan = async (query: object) => {
  return await LoanModel.findOne(query)
    .select("-__v")
    .populate("book")
    .populate("user");
};
