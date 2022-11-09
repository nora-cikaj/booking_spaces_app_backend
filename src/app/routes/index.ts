import { Router } from 'express';
import healthRouter from './health';
import authRouter from '../modules/auth/auth.router';
import userRouter from '../modules/user/user.router';
import eventRouter from '../modules/event/event.router';
import usersRouter from '../modules/users/users.router';
import resourcesRouter from '../modules/resources/resources.router';
import freebusyRouter from '../modules/freebusy/freebusy.router';

const router = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(userRouter);
router.use(eventRouter);
router.use(usersRouter);
router.use(resourcesRouter);
router.use(freebusyRouter);

export default router;
