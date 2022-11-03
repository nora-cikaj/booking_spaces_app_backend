import Router from 'express';
import * as controller from './event.controller';
import routes from '../../constants/routes';

const router = Router();

router.route(`${routes.EVENT}`).get(controller.listEvents);
router.route(`${routes.EVENT}`).post(controller.createEvent);
router.route(`${routes.EVENT}/:id`).put(controller.updateEvent);
router.route(`${routes.EVENT}/:id`).delete(controller.deleteEvent);

export default router;
