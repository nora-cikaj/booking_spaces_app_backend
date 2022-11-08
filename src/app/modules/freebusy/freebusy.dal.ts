import { auth, calendar } from '../../config/client/serviceAccountClient';

export const listFreeBusy = async (timeMin: string, timeMax: string) => {
  const response = await calendar.freebusy.query({
    auth: auth,
    requestBody: {
      timeMin,
      timeMax,
      items: [{ id: process.env.CALENDAR_ID }],
    },
  });
  return response.data;
};
