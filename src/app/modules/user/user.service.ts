import * as dal from './user.dal';
import { validateCreateUserRequest } from './user.validator';
import { NotFound } from '../../utils/errors';
import errors from '../../constants/errors';
import { User } from '../../types/express';
import { CreateUserRequestBody, UpdateUserRequestBody } from './user.types';

export const listUsers = async (): Promise<User[]> => {
  const response: User[] = await dal.listUsers();
  return response;
};

export const getSingleUser = async ({ id }): Promise<User> => {
  const query = {
    id,
  };
  const response: User = await dal.readUser({ query });
  if (!response) {
    throw new NotFound(errors.AUTH.USER_NOT_FOUND);
  }
  return response;
};

export const upsertUser = async (
  { requestBody }: { requestBody: CreateUserRequestBody },
): Promise<User> => {
  const data = validateCreateUserRequest({ requestBody });

  const query = {
    id: data.id,
  };

  const createData: User = {
    ...data,
    admin: false,
  };

  const updateData: UpdateUserRequestBody = {
    name: data.name,
    lastName: data.lastName,
    avatarUrl: data.avatarUrl,
  };

  const response: User = await dal.upsertUser({
    query,
    createData,
    updateData,
  });
  return response;
};

export const updateUser = async (
  { id, admin }: { id: string, admin: boolean },
): Promise<User> => {
  const existingUser = await getSingleUser({ id });
  if (!existingUser) {
    throw new NotFound(errors.AUTH.USER_NOT_FOUND);
  }

  const query = {
    id,
  };

  const data = {
    admin,
  };
  const response = await dal.updateUser({ query, data });
  return response;
};

export const deleteUser = async ({ id }: { id: string }): Promise<void> => {
  const existingUser = await getSingleUser({ id });
  if (!existingUser) {
    throw new NotFound(errors.AUTH.USER_NOT_FOUND);
  }

  const query = {
    id,
  };

  await dal.deleteUser({ query });
};
