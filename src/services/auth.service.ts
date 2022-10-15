import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";
import HttpException from "../models/http-exception.model";
import { UserRegisterModel } from "../models/user-register.model";

export const registerUser = async (model: UserRegisterModel) => {
  const firstName = model.firstName?.trim();
  const lastName = model.lastName?.trim();
  const username = model.username?.trim();
  const email = model.email?.trim();

  if (!firstName)
    throw new HttpException(422, {
      errors: { firstName: "First name is required" },
    });

  if (!lastName)
    throw new HttpException(422, {
      errors: { firstName: "Last name is required" },
    });

  if (!username)
    throw new HttpException(422, {
      errors: { firstName: "Username is required" },
    });

  if (!email)
    throw new HttpException(422, {
      errors: { firstName: "Email is required" },
    });

  const hashedPassword = await bcrypt.hash(model.password, 12);
  return await prisma.user.create({
    data: { ...model, password: hashedPassword },
    select: {
      id: true,
    },
  });
};
