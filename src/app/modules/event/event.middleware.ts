import errors from '../../constants/errors';
import { NotAuthorized } from '../../utils/errors';
import * as dal from './event.dal';

export const checkIfEventExists = async (eventId: string, email: string) => {
  const foundEvent = await dal.getEvent(eventId);
  if (foundEvent.data.organizer.email !== email) {
    throw new NotAuthorized(errors.EVENT.NOT_AUTHORIZIED);
  }
};
