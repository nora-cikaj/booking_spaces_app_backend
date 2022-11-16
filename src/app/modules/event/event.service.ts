import { calendar_v3 } from 'googleapis';
import { BadRequest } from '../../utils/errors';
import * as dal from './event.dal';
import * as validator from './event.validator';
import { checkIfEventExists } from './event.middleware';
import { RequestParamsType } from './event.type';

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
    data.creator = event.creator;
    const response = await dal.moveEvent(data.id, event.organizer.email);
    return response.data;
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
  await checkIfEventExists(id, email);
  try {
    await dal.updateEvent(id, event);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

export const deleteEvent = async (id: string, email: string) => {
  validator.validateDeleteEventRequest(email);
  await checkIfEventExists(id, email);
  try {
    await dal.deleteEvent(id);
  } catch (error) {
    throw new BadRequest(error.message);
  }
};
