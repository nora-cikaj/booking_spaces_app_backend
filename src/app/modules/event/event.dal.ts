import { calendar_v3, google } from 'googleapis';
import momentTZ from 'moment-timezone';
import moment from 'moment';
import { NotFound } from '../../utils/errors';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const jwtClient = new google.auth.JWT(
  process.env.CREDENTIALS_CLIENT_EMAIL,
  null,
  process.env.CREDENTIALS_PRIVATE_KEY,
  SCOPES,
);

const calendar = google.calendar({
  version: 'v3',
  auth: jwtClient,
});
const auth = new google.auth.GoogleAuth({
  keyFile: './boothup-b6649aa108aa.json',
  scopes: SCOPES,
});
auth.getClient();

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
  event: calendar_v3.Schema$Event,
  id: string,
) => {
  await calendar.events.update({
    auth: auth,
    calendarId: process.env.CALENDAR_ID,
    eventId: id,
    requestBody: event,
  });
};

export const deleteEvent = async (id: string) => {
  await calendar.events.delete({
    auth: auth,
    calendarId: process.env.CALENDAR_ID,
    eventId: id,
  });
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
