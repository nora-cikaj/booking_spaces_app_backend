import { GoogleAuth } from 'googleapis-common';

export type ListEventBodyType = {
  auth: GoogleAuth<any>;
  calendarId: string;
  singleEvents: boolean;
  orderBy: string;
  timeMin?: string;
  timeMax?: string;
};

export type QueryType = {
  timeMin?: string;
  timeMax?: string;
};

export type RequestParamsType = {
  requestParams: QueryType;
};
