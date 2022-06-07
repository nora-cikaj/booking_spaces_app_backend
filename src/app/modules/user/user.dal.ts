import { PrismaClient } from '@prisma/client';
import { User } from '../../types/express';

const prisma = new PrismaClient();

export const listUsers = async (): Promise<User[]> => {
  const response: User[] = await prisma.user.findMany({});
  return response;
};

export const upsertUser = async ({ query, updateData, createData }): Promise<User> => {
  const response = await prisma.user.upsert({
    where: query,
    create: createData,
    update: updateData,
  });
  return response;
};

export const readUser = async ({ query }): Promise<User> => {
  const response = await prisma.user.findUnique({ where: query });
  return response;
};

export const updateUser = async ({ query, data }): Promise<User> => {
  const response = await prisma.user.update({ where: query, data });
  return response;
};

export const deleteUser = async ({ query }): Promise<void> => {
  await prisma.user.delete({ where: query });
};
