## BoothUp - backend

BoothUp is a internal booth and meeting room reservation system.

## Main features

- Create an event/meet.
- Select your booth or room from the Softup floor map.
- Invite internal employees to your event/meet.
- View event/meet details
- Edit event/meet
- Delete event/meet

## Tech Stack

**Server:** Node, Express

## Environment Variables

To run this project, you will need to add the following environment variables to your **.env** and **.env.dev** file that are located in the root directory of the project.

```bash
`PORT`

`DATABASE_URL`

`CLIENT_ID`

`CLIENT_SECRET`

`SESSION_SECRET`

`CALENDAR_ID`

`CREDENTIALS_TYPE`

`CREDENTIALS_PROJECT_ID`

`CREDENTIALS_PRIVATE_KEY_ID`

`CREDENTIALS_PRIVATE_KEY`

`CREDENTIALS_CLIENT_EMAIL`

`CREDENTIALS_CLIENT_ID`

`CREDENTIALS_AUTH_URI`

`CREDENTIALS_TOKEN_URI`

`CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL`

`CREDENTIALS_CLIENT_X509_CERT_URL`

`PROJECT_NUMBER`
```

To get this variables, you will need to have access to the github repository of the project and then go to:

```bash
  Settings / secrets / actions
```

Otherwise you wille have to generate a new key in the service account.

## Boothup key file

You are going to need also the json key file of the service account. You can get it at the github repository just like we did in the previous section for **.env variables**. If not found you can generate a new **key file** at the Google cloud service account

## Run Locally

Install dependencies

```bash
  npm install / npm i
```

Start the server in development mode

```bash
  npm run dev
```

Runs the app in the development mode.\
Open [http://localhost:4000/api/swagger](http://localhost:4000/api/swagger) to view it in the browser.

## Note

Work carefully and write clean code ✌🏻.
