import Router from 'express';
import * as controller from './freebusy.controller';
import routes from '../../constants/routes';
import authenticated from '../../middleware/authenticated';

const router = Router();

router
  .route(`${routes.FREEBUSY}`)
  .post(authenticated, controller.getFreeBusyList);

export default router;
