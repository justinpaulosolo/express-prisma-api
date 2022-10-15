import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const generateToken = (user: Partial<User>): string => {
  return jwt.sign(user, process.env.JWT_SECRET || "supersecret", {
    expiresIn: 60,
  });
};

export default generateToken;
