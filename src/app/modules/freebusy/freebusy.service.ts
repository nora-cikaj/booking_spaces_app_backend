import { BadRequest } from '../../utils/errors';
import * as dal from './freebusy.dal';

export const listFreeBusy = async (timeMin: string, timeMax: string) => {
  try {
    const response = await dal.listFreeBusy(timeMin, timeMax);
    return response;
  } catch (error) {
    throw new BadRequest(error.message);
  }
};
