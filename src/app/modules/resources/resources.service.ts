import { BadRequest } from '../../utils/errors';
import * as dal from './resoruces.dal';

export const listResources = async () => {
  try {
    const response = await dal.listResources();
    return response;
  } catch (error) {
    throw new BadRequest(error.message);
  }
};
