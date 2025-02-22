import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = (req as any).decoded.role;
  if (userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }
  next();
};
