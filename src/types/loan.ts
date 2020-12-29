import { Document } from "mongoose";
import { BookDocument } from "./book";
import { UserDocument } from "./user";

export interface LoanDocument {
  id: string;
  book: BookDocument;
  user: UserDocument;
  issueDate: string;
  dueDate: number;
  returnDate: number;
}

export interface NewLoanInput {
  book: string;
  user: string;
  issueDate: string;
}

export type LoanModelType = LoanDocument & Document;
