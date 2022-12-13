import Router from 'express';
import * as controller from './users.controller';
import routes from '../../constants/routes';
import authenticated from '../../middleware/authenticated';

const router = Router();

router.route(`${routes.USERS}`).get(authenticated, controller.getUsers);

export default router;
