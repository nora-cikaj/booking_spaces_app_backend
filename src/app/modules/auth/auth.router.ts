import Router, { NextFunction, Response } from 'express';
import Passport from 'passport';
import routes from '../../constants/routes';
import { CustomRequest } from '../../types/express';
import './authenticate';

const router = Router();

/**
 * @openapi
 *
 * paths:
 *  /auth/login:
 *    get:
 *      tags:
 *        - Authentication
 *      summary: Log in
 *      description: Log in user using google sign in
 *
*/

router.route(`${routes.AUTH}/login`).get(
  Passport.authenticate('google', { scope: ['email', 'profile'] }),
);

/**
 * @openapi
 *
 * paths:
 *  /auth/login/callback:
 *    get:
 *      tags:
 *        - Authentication
 *      summary: Log in
 *      description: Log in user using google sign in
 *
*/

router.route(`${routes.AUTH}/login/callback`).get(
  Passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure',
  }),
);

router.route(`${routes.AUTH}/logout`).get(
  (req: CustomRequest, res: Response, next: NextFunction) => {
    req.logout((error) => {
      if (error) {
        return next(error);
      }
    });
    req.session.destroy();
    res.status(200).send('LoggedOut');
  },
);

router.route(`${routes.AUTH}/failure`).get(
  (req: CustomRequest, res: Response) => {
    res.status(400).send('Failed to authenticate');
  },
);

export default router;
