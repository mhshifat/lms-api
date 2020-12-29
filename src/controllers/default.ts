import { Request, Response } from "express";

export const rootRoute = (_: Request, res: Response) => {
  return res.status(200).json({
    name: "Library Management System",
    version: "1.0.0",
    description: "APIs for a library management system",
  });
};
