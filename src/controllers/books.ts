import { Request, Response } from "express";
import { responseHandler } from "../helpers";
import { BookServices } from "../services";
import { NewBookInput } from "../types/book";

export const getBooks = async (req: Request, res: Response) => {
  const books = await BookServices.getBooks({});
  return responseHandler(res, 200, {
    books,
  });
};

export const createBook = async (req: Request, res: Response) => {
  const { title, numOfCopies } = req.body as NewBookInput;
  await BookServices.isBookFound({
    res,
    query: { title },
  });
  const createdBook = await BookServices.createBook({
    book: {
      ...req.body,
      availableCopies: numOfCopies,
    },
  });
  return responseHandler(res, 200, {
    createdBook,
  });
};

export const getBook = async (req: Request, res: Response) => {
  const book = await BookServices.getBook({
    _id: req.params.id,
  });
  return responseHandler(res, 200, {
    book,
  });
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await BookServices.getBook({
    _id: req.params.id,
  });

  book?.set({
    ...req.body,
  });
  await book?.save();

  return responseHandler(res, 200, {
    updatedBook: book,
  });
};

export const deleteBook = async (req: Request, res: Response) => {
  const book = await BookServices.getBook({
    _id: req.params.id,
  });
  await book?.delete();

  return responseHandler(res, 200, {
    deleteUser: book,
  });
};
