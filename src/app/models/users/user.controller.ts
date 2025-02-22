import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { UserService } from "./user.services";

const JWT_SECRET = config.jwtSecret;
const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
      });
    }

    const existingUser = await UserService.findUserByEmail(email as string);

    if (existingUser) {
      return res.status(409).json({
        message: "User email already exists",
        success: false,
      });
    }

    const userRole = role || "user";

    const data = {
      email,
      password,
      role: userRole,
    };

    const user = await UserService.createUser(data);

    if (!user) {
      return res.status(500).json({
        message: "User registration failed",
        success: false,
      });
    }

    const token = jwt.sign({ _id: user?._id }, JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      data: { user, token },
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
      });
    }

    const user = await UserService.findUserByEmail(email as string);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isValid = await UserService.validatePassword(
      password as string,
      email as string
    );

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign(
      { _id: user._id, email, role: user.role },
      JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: { user, token },
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
};

export const UserController = { register, loginUser };
