import Router, { NextFunction, Response } from 'express';
import Passport from 'passport';
import routes from '../../constants/routes';
import { CustomRequest } from '../../types/express';
import './authenticate';

const router = Router();

router
  .route(`${routes.AUTH}/login`)
  .get(Passport.authenticate('google', { scope: ['email', 'profile'] }));

router.route(`${routes.AUTH}/login/callback`).get(
  Passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/authenticate',
    failureRedirect: '/auth/google/failure',
  }),
);

router
  .route(`${routes.AUTH}/logout`)
  .get((req: CustomRequest, res: Response, next: NextFunction) => {
    req.logout((error) => {
      if (error) {
        return next(error);
      }
    });
    req.session.destroy();
    res.status(200).send();
  });

router
  .route(`${routes.AUTH}/google/failure`)
  .get((req: CustomRequest, res: Response) => {
    res.status(400).send('Failed to authenticate');
  });

export default router;
