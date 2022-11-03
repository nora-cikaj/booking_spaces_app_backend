import { BadRequest } from '../../utils/errors';
import * as dal from './users.dal';

export const listUsers = async () => {
  try {
    const response = await dal.listUsers();
    return response;
  } catch (error) {
    throw new BadRequest(error.message);
  }
};
