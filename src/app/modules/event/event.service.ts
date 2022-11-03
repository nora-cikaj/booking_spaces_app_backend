import { calendar_v3 } from 'googleapis';
import { BadRequest } from '../../utils/errors';
import * as dal from './event.dal';
import * as validator from './event.validator';
import { checkIfEventExists } from './event.middleware';

export const listEvents = async () => {
  try {
    const response = await dal.listEvents();
    return response;
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

export const createEvent = async (event: calendar_v3.Schema$Event) => {
  validator.validateEvent(event);
  try {
    const result = await dal.addCalendarEvent(event);
    return result;
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
  checkIfEventExists(id, email);
  try {
    await dal.updateEvent(event, id);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

export const deleteEvent = async (id: string, email: string) => {
  validator.validateDeleteEventRequest(email);
  checkIfEventExists(id, email);
  try {
    await dal.deleteEvent(id);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};
