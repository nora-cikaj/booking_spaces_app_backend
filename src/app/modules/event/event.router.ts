import Router from 'express';
import * as controller from './event.controller';
import routes from '../../constants/routes';
import authenticated from '../../middleware/authenticated';

const router = Router();

router.route(`${routes.EVENT}`).get(authenticated, controller.listEvents);

router.route(`${routes.EVENT}`).post(authenticated, controller.createEvent);

router.route(`${routes.EVENT}/:id`).put(authenticated, controller.updateEvent);

router
  .route(`${routes.EVENT}/:id`)
  .delete(authenticated, controller.deleteEvent);

export default router;
