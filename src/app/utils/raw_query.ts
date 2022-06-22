import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawQuery = async ({ query }): Promise<any> => {
  const result = await prisma.$queryRawUnsafe(query);
  return result;
};

export default rawQuery;
