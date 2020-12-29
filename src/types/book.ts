import { Document } from "mongoose";

export interface BookDocument {
  id: string;
  title: string;
  author: string;
  image: string;
  numOfCopies: number;
  availableCopies: number;
}

export interface NewBookInput {
  title: string;
  author: string;
  image: string;
  numOfCopies: number;
}

export type BookModelType = BookDocument & Document;
