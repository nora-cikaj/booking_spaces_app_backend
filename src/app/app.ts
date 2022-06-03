/* eslint-disable arrow-body-style */
import Path from 'path';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import YAML from 'yamljs';
import SwaggerUI from 'swagger-ui-express';
import SwaggerJsdoc from 'swagger-jsdoc';
import passport from 'passport';
import { initLoggerService } from './config/logger/index';
import errorHandler from './middleware/error_middleware';
import authenticated from './middleware/authenticated';
import routes from './constants/routes';
import router from './routes';
import config from './config/var/development';
import { CustomRequest } from './types/express';

const initExpressApp = async () => {
  const app = express();
  initLoggerService();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: config.appUrl, credentials: true }));
  app.set('trust proxy', 1);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      // Cookies added only on production (https protocol)
      // cookie: {
      //   sameSite: 'none',
      //   secure: true,
      //   maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
      // },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(routes.BASE, router);

  // Will be removed, testing purpose
  app.get('/', (req, res) => {
    return res.send(`<a href="${routes.BASE}${routes.AUTH}/login">Authenticate with Google</a>`);
  });

  app.get('/protected', authenticated, (req: CustomRequest, res) => {
    return res.send(`Hello ${req.user.name}`);
  });

  // Setup docs

  const docsFilePath: string = Path.resolve(__dirname, '../docs/openapi.yaml');
  const jsonDocsFile = YAML.load(docsFilePath);
  const docs = SwaggerJsdoc({
    swaggerDefinition: jsonDocsFile,
    apis: ['./src/app/**/*.ts'],
  });

  app.use(
    '/api/swagger',
    SwaggerUI.serve,
    SwaggerUI.setup(docs),
  );

  // Error handling
  app.use(errorHandler);

  return app;
};

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error) => {
  errorHandler(error);
});

export default initExpressApp;
