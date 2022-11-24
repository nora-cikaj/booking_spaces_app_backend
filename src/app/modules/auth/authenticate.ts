import Passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { upsertUser } from '../user/user.service';
import * as userDal from '../user/user.dal';
import routes from '../../constants/routes';
import { User } from '../../types/express';

Passport.serializeUser((user: User, done: any) => {
  done(null, user);
});

Passport.deserializeUser(async (user: User, done: any) => {
  const loggedInUser = await userDal.getUserByQuery({
    email: user.email,
  });

  const myEvents = loggedInUser?.myEvents ? loggedInUser?.myEvents : [];

  const newUser = await upsertUser({ requestBody: { ...user, myEvents } });
  done(null, newUser);
});

Passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${routes.BASE}${routes.AUTH}/login/callback`,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const loggedInUser = await userDal.getUserByQuery({
        email: profile.email,
      });

      const myEvents = loggedInUser?.myEvents ? loggedInUser?.myEvents : [];

      const newUser = {
        id: profile.id,
        name: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        avatarUrl: profile.picture,
        myEvents,
      };
      try {
        done(null, newUser);
      } catch (e) {
        done(e, null);
      }
    },
  ),
);
