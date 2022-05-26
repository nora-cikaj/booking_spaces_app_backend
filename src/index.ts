import initExpressApp from './app/app';
import config from './app/config/var/development';

(async () => {
  const app = await initExpressApp();
  app.listen(config.port, () => {
    console.log(`Server is up on port ${config.port}`);
  });
})();
