import { User } from "@prisma/client";
import prisma from "../utils/prisma";

export const createUser = async (user: User) => {
  return await prisma.user.create({
    data: user,
    select: {
      id: true,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
};