import { PrismaClient } from '@prisma/client';
import { User } from '../../types/express';

const prisma = new PrismaClient();

export const listUsers = async (): Promise<User[]> => {
  const response: User[] = await prisma.user.findMany({});
  return response;
};

export const insertUser = async ({ data }): Promise<User> => {
  const response = await prisma.user.create({ data });
  return response;
};

export const readUser = async ({ query }): Promise<User> => {
  const response = await prisma.user.findUnique({ where: query });
  return response;
};
