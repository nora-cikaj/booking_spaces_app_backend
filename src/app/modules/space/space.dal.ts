import { PrismaClient } from '@prisma/client';
import { Space, CreateSpaceRequestBody } from './space.types';

const prisma = new PrismaClient();

export const createSpace = async ({ data }: { data: CreateSpaceRequestBody }): Promise<Space> => {
  const response: Space = await prisma.space.create({ data });
  return response;
};

export const getSpace = async ({ query }): Promise<Space> => {
  const response: Space = await prisma.space.findUnique({ where: query });
  return response;
};

export const listSpaces = async (): Promise<Space[]> => {
  const response: Space[] = await prisma.space.findMany({});
  return response;
};

export const updateSpace = async ({ query, data }): Promise<Space> => {
  const response: Space = await prisma.space.update({ where: query, data });
  return response;
};

export const deleteSpace = async ({ query }): Promise<void> => {
  await prisma.space.delete({ where: query });
};
