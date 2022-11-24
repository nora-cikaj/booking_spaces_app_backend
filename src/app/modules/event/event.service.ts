import { calendar_v3 } from 'googleapis';
import { BadRequest } from '../../utils/errors';
import * as dal from './event.dal';
import * as userDal from '../user/user.dal';
import * as validator from './event.validator';
import { checkIfEventExists } from './event.middleware';
import { RequestParamsType } from './event.type';
import errors from '../../constants/errors';

export const listEvents = async ({ requestParams }: RequestParamsType) => {
  validator.validateGetAllEventsRequest(requestParams);

  try {
    const response = await dal.listEvents(
      requestParams.timeMin,
      requestParams.timeMax,
    );
    return response;
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

export const createEvent = async (event: calendar_v3.Schema$Event) => {
  validator.validateEvent(event);
  try {
    const { data } = await dal.addCalendarEvent(event);
    const foundUser = await userDal.getUserByQuery({
      email: event.organizer.email,
    });
    if (!foundUser) {
      throw new BadRequest(errors.AUTH.USER_NOT_FOUND);
    }
    const myEvents = [...foundUser.myEvents, data.id];

    const userUpdateBody = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      lastName: foundUser.lastName,
      avatarUrl: foundUser.avatarUrl,
      myEvents: myEvents,
    };

    await userDal.updateUserEvents(foundUser._id, userUpdateBody);

    return data;
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

export const updateEvent = async (
  event: calendar_v3.Schema$Event,
  id: string,
  email: string,
) => {
  validator.validateUpdateEventRequest(event, email);
  await checkIfEventExists(id);
  try {
    await dal.updateEvent(id, event);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

export const deleteEvent = async (id: string, email: string) => {
  validator.validateDeleteEventRequest(email);
  await checkIfEventExists(id);
  try {
    const foundUser = await userDal.getUserByQuery({
      email,
    });
    if (!foundUser) {
      throw new BadRequest(errors.AUTH.USER_NOT_FOUND);
    }
    const myEvents = foundUser.myEvents.filter((eventId) => eventId !== id);

    const userUpdateBody = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      lastName: foundUser.lastName,
      avatarUrl: foundUser.avatarUrl,
      myEvents: myEvents,
    };

    await userDal.updateUserEvents(foundUser._id, userUpdateBody);
    await dal.deleteEvent(id);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};
