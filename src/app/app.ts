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
import './modules/auth/authenticate';

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
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(routes.BASE, router);

  app.get('/protected', authenticated, (req: CustomRequest, res) => {
    return res.send(req.user);
  });

  app.get('/logout', authenticated, (req: CustomRequest, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });

  // Setup docs

  const docsFilePath: string = Path.resolve(
    __dirname,
    '../docs/swaggerApi.yaml',
  );
  const jsonDocsFile = YAML.load(docsFilePath);
  const docs = SwaggerJsdoc({
    swaggerDefinition: jsonDocsFile,
    apis: ['./src/app/**/*.ts'],
  });

  app.use('/api/swagger', SwaggerUI.serve, SwaggerUI.setup(docs));

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
