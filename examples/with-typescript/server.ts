import express from 'express';
import passport from 'passport';
import { Strategy } from '@superfaceai/passport-twitter-oauth2';
import session from 'express-session';
require('dotenv').config();

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj: Express.User, done) {
  done(null, obj);
});

// Use the Twitter OAuth2 strategy within Passport
passport.use(
  new Strategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      clientType: 'confidential',
      callbackURL: `${process.env.BASE_URL}/auth/twitter/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Success!', { accessToken, refreshToken });
      return done(null, profile);
    }
  )
);

const app = express();

app.use(passport.initialize());
app.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialized: true })
);

app.get(
  '/auth/twitter',
  passport.authenticate('twitter', {
    scope: ['tweet.read', 'users.read', 'offline.access'],
  })
);

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter'),
  function (req, res) {
    const userData = JSON.stringify(req.user, undefined, 2);
    res.end(
      `<h1>Authentication succeeded</h1> User data: <pre>${userData}</pre>`
    );
  }
);

app.listen(3000, () => {
  console.log(`Listening on ${process.env.BASE_URL}`);
});
