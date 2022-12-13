import Router from 'express';
import authenticated from '../../middleware/authenticated';
import * as controller from './user.controller';
import routes from '../../constants/routes';

const router = Router();

router
  .route(`${routes.LOGGED_IN_USER}`)
  .get(authenticated, controller.getLoggedInUser);

router.route(`${routes.USER}`).post(authenticated, controller.upsertUser);

router.route(`${routes.USER}`).get(authenticated, controller.getAllActiveUsers);

export default router;
