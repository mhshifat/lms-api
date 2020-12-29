import { Request, Response } from "express";
import { responseHandler } from "../helpers";
import { BookServices, LoanServices } from "../services";
import { NewLoanInput } from "../types/loan";

export const getLoans = async (req: Request, res: Response) => {
  const loans = await LoanServices.getLoans({});
  return responseHandler(res, 200, {
    loans,
  });
};

export const createLoan = async (req: Request, res: Response) => {
  const date = new Date();
  const { book, user } = req.body as NewLoanInput;
  await LoanServices.isLoanFound({
    res,
    query: { book, user },
  });
  const createdLoan = await LoanServices.createLoan({
    loan: {
      ...req.body,
      status: "In Progress",
      issueDate: date,
      dueDate: date.setDate(date.getDate() + 4),
    },
  });
  const foundedBook = await BookServices.getBook({ _id: book });
  foundedBook?.set({
    availableCopies:
      foundedBook.availableCopies > 0 ? +foundedBook.availableCopies - 1 : 0,
  });
  await foundedBook?.save();
  return responseHandler(res, 200, {
    createdLoan,
  });
};

export const getLoan = async (req: Request, res: Response) => {
  const loan = await LoanServices.getLoan({
    _id: req.params.id,
  });
  return responseHandler(res, 200, {
    loan,
  });
};

export const updateLoan = async (req: Request, res: Response) => {
  const loan = await LoanServices.getLoan({
    _id: req.params.id,
  });

  loan?.set({
    ...req.body,
    status: "Closed",
  });
  await loan?.save();
  const foundedBook = await BookServices.getBook({ _id: loan?.book });
  foundedBook?.set({
    availableCopies:
      foundedBook.availableCopies > 0 ? +foundedBook.availableCopies + 1 : 0,
  });
  await foundedBook?.save();

  return responseHandler(res, 200, {
    updatedLoan: loan,
  });
};

export const deleteLoan = async (req: Request, res: Response) => {
  const loan = await LoanServices.getLoan({
    _id: req.params.id,
  });
  await loan?.delete();
  const foundedBook = await BookServices.getBook({ _id: loan?.book });
  foundedBook?.set({
    availableCopies:
      foundedBook.availableCopies > 0 ? +foundedBook.availableCopies + 1 : 0,
  });
  await foundedBook?.save();

  return responseHandler(res, 200, {
    deleteUser: loan,
  });
};
