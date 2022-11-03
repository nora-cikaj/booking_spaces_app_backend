import { google } from 'googleapis';

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

const service = google.admin({ version: 'directory_v1', auth: jwtClient });

const auth = new google.auth.GoogleAuth({
  keyFile: './boothup-b6649aa108aa.json',
  scopes: SCOPES,
});
auth.getClient();

export { auth, service, calendar };

