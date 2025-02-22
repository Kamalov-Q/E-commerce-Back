import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config";

const JWT_SECRET = config.jwtSecret as string;
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      (req as any).decoded = decoded;
      return next();
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
