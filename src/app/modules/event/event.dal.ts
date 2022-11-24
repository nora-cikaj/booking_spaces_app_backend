import { calendar_v3 } from 'googleapis';
import { NotFound } from '../../utils/errors';
import { calendar, auth } from '../../config/client/serviceAccountClient';
import { ListEventBodyType } from './event.type';

export const listEvents = async (timeMin?: string, timeMax?: string) => {
  const body: ListEventBodyType = {
    auth: auth,
    calendarId: process.env.CALENDAR_ID,
    singleEvents: true,
    orderBy: 'startTime',
  };
  if (timeMin) {
    body.timeMin = timeMin;
  }
  if (timeMax) {
    body.timeMax = timeMax;
  }

  const response = await calendar.events.list(body);
  return response.data.items;
};

export const addCalendarEvent = async (event: calendar_v3.Schema$Event) => {
  const newEvent = await calendar.events.insert({
    auth: auth,
    calendarId: process.env.CALENDAR_ID,
    requestBody: event,
  });
  return newEvent;
};

export const updateEvent = async (
  id: string,
  event: calendar_v3.Schema$Event,
) => {
  const response = await calendar.events.patch({
    auth: auth,
    calendarId: process.env.CALENDAR_ID,
    eventId: id,
    requestBody: event,
  });
  return response;
};

export const deleteEvent = async (id: string) => {
  await calendar.events.delete({
    auth: auth,
    calendarId: process.env.CALENDAR_ID,
    eventId: id,
  });
};

export const moveEvent = async (eventId: string, destination: string) => {
  const respose = await calendar.events.move({
    auth: auth,
    calendarId: process.env.CALENDAR_ID,
    eventId: eventId,
    destination,
  });
  return respose;
};

export const getEvent = async (id: string) => {
  try {
    const event = await calendar.events.get({
      auth: auth,
      calendarId: process.env.CALENDAR_ID,
      eventId: id,
    });
    return event;
  } catch (error) {
    throw new NotFound(error.message);
  }
};
