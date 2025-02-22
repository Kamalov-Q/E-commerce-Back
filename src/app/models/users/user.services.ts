import { TUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcryptjs";

const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

const createUser = async ({
  email,
  role,
  password,
}: {
  email: string;
  role: string;
  password: string;
}): Promise<TUser | null> => {
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    role,
    password: hashPassword,
  });

  if (!user) {
    return null;
  }

  return user;
};

const validatePassword = async (password: string, email: string) => {
  const user = await UserService.findUserByEmail(email);
  const isValid = await bcrypt.compare(password, user.password);
  return isValid;
};

export const UserService = { findUserByEmail, createUser, validatePassword };
