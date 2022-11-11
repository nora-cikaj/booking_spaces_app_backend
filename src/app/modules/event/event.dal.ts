import { calendar_v3 } from 'googleapis';
import momentTZ from 'moment-timezone';
import moment from 'moment';
import { NotFound } from '../../utils/errors';
import { calendar, auth } from '../../config/client/serviceAccountClient';

export const listEvents = async () => {
  const response = await calendar.events.list({
    auth: auth,
    calendarId: process.env.CALENDAR_ID,
    timeMin: moment(momentTZ().tz('Europe/Berlin').format())
      .utc()
      .startOf('day')
      .toISOString(),
    timeMax: moment(momentTZ().tz('Europe/Berlin').format())
      .utc()
      .endOf('day')
      .toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });
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
  const response = await calendar.events.update({
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
