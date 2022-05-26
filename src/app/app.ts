import express from 'express';
import Path from 'path';
import YAML from 'yamljs';
import SwaggerUI from 'swagger-ui-express';
import SwaggerJsdoc from 'swagger-jsdoc';
import { initLoggerService } from './config/logger/index';
import errorHandler from './middleware/error_middleware';
import routes from './routes';

const initExpressApp = async () => {
  const app = express();
  initLoggerService();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/v1', routes);

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
