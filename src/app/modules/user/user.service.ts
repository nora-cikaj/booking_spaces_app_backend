import { User } from '../../types/express';
import { NotFound } from '../../utils/errors';
import * as dal from './user.dal';

export const listUsers = async (): Promise<User[]> => {
  const response: User[] = await dal.listUsers();
  return response;
};
// (
//   [{
//     id: 1,
//     name: 'Nora',
//     lastname: 'Cikaj',
//     email: 'noracikaj@gmail.com',
//     avatarUrl: 'photo',
//     admin: false,
//   }]
// );
export const createUser = async ({ requestBody }): Promise<User> => {
  // validate requestBody
  const response: User = await dal.insertUser({ data: requestBody });
  return response;
};

export const getSingleUser = async ({ id }): Promise<User> => {
  const query = {
    id,
  };
  const response: User = await dal.readUser({ query });
  if (!response) {
    throw new NotFound('');
  }
  return response;
};
