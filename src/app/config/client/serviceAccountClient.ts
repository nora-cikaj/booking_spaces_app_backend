import { google } from 'googleapis';

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.events.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/admin.directory.resource.calendar',
  'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
  'https://www.googleapis.com/auth/admin.directory.user',
  'https://www.googleapis.com/auth/admin.directory.user.readonly',
  'https://www.googleapis.com/auth/cloud-platform',
];

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
  keyFile: './boothup-368114-e99996c75938.json',
  scopes: SCOPES,
  clientOptions: {
    subject: process.env.ADMIN_EMAIL,
  },
});
auth.getClient();

export { auth, service, calendar };
