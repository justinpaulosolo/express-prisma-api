import { User } from "@prisma/client";
import prisma from "../utils/prisma";

export const updateUser = async (user: User) => {
  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
    select: {
      id: true,
    },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id,
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
