import Router from 'express';
import * as controller from './resources.controller';
import routes from '../../constants/routes';
import authenticated from '../../middleware/authenticated';

const router = Router();

router.route(`${routes.RESOURCES}`).get(authenticated, controller.getResources);

export default router;
