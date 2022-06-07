import Passport from 'passport';
import { getSingleUser, upsertUser } from '../user/user.service';
import routes from '../../constants/routes';
import { User } from '../../types/express';

const GoogleStrategy = require('passport-google-oauth2').Strategy;

Passport.serializeUser((user: User, done: any) => {
  done(null, user.id);
});

Passport.deserializeUser(async (id: string, done: any) => {
  const user = await getSingleUser({ id });
  done(null, user);
});

Passport.use(new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${routes.BASE}${routes.AUTH}/login/callback`,
    passReqToCallback: true,
  },
  (async (request, accessToken, refreshToken, profile, done) => {
    const newUser = {
      id: profile.id,
      name: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      avatarUrl: profile.picture,
    };
    try {
      const user = await upsertUser({ requestBody: newUser });
      done(null, user);
    } catch (e) {
      // done(e, null);
    }
  }),
));
