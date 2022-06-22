import { Router } from 'express';

import healthRouter from './health';
import authRouter from '../modules/auth/auth.router';
import userRouter from '../modules/user/user.router';
import spaceRouter from '../modules/space/space.router';
import bookingRouter from '../modules/booking/booking.router';

const router = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(userRouter);
router.use(spaceRouter);
router.use(bookingRouter);

export default router;
