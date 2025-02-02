const express = require('express');
const passport = require('passport');
const { Strategy } = require('@superfaceai/passport-twitter-oauth2');
const session = require('express-session');
require('dotenv').config();

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the Twitter OAuth2 strategy within Passport
passport.use(
  new Strategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
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
  (req, res, next) => {
    const stateObject = {
      key: req.query.state
    };

    passport.authenticate('twitter', {
      scope: ['tweet.read', 'users.read', 'offline.access'],
      state: stateObject // Passing the state as an object is required by the Passport strategy
    })(req, res, next);
  }
);


app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter'),
  function (req, res) {
    // Regenerate the session to prevent session fixation attacks
    req.session.regenerate(function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to regenerate session' });
      }

      const state = JSON.stringify(req.session.req.authInfo.state, undefined, 2);
      const userData = JSON.stringify(req.user, undefined, 2);
      res.end(
        `<h1>Authentication succeeded</h1> User data: <pre>${userData}</pre>
        State:
        <pre>${state}</pre>
        `
      );
    });
  }
);

app.listen(3000, () => {
  console.log(`Listening on ${process.env.BASE_URL}`);
});
