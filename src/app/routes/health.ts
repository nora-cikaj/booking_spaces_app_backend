import { Router } from 'express';
import routes from '../constants/routes';

const router = Router();

router.route(routes.HEALTH).get((_req, res) => {
  res.status(200).json({
    appName: 'BoothUp',
    version: process.env.npm_package_version,
    status: 'OK',
  });
});

export default router;
