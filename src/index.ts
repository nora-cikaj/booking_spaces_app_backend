import initExpressApp from './app/app';
import config from './app/config/var/development';
import initDb from './app/db';

(async () => {
  const app = await initExpressApp();
  await initDb();
  app.listen(config.port, () => {
    console.log(`Server is up on port ${config.port}`);
  });
})();
