import Passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { upsertUser } from '../user/user.service';
import routes from '../../constants/routes';
import { User } from '../../types/express';

Passport.serializeUser((user: User, done: any) => {
  done(null, user);
});

Passport.deserializeUser(async (user: User, done: any) => {
  const newUser = await upsertUser({ requestBody: user });
  done(null, newUser);
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
      done(null, newUser);
    } catch (e) {
      done(e, null);
    }
  }),
));
