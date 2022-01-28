# passport-twitter-oauth2

[Passport](http://passportjs.org/) strategy for authenticating with [Twitter](http://twitter.com/)
using the [OAuth 2.0 API](https://developer.twitter.com/en/docs/authentication/oauth-2-0).

[Twitter announced OAuth 2.0 general availability](https://twittercommunity.com/t/announcing-oauth-2-0-general-availability/163555) on 14. 12. 2021. Twitter encourages developers to use Twitter API 2.0 with OAuth 2.0 authentication.

Twitter OAuth 2.0 implementation specifics:

- [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) is required
- OAuth2 client credentials must be passed via Authorization header for private client types

This module lets you authenticate using Twitter in your Node.js applications.
By plugging into Passport, Twitter authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```bash
$ npm install @superfaceai/passport-twitter-oauth2
```

## Usage

#### Create an Application

Before using `@superfaceai/passport-twitter-oauth2`, you must register project and an application with Twitter by following these steps:

- go to https://developer.twitter.com/ and either sign up for a new account or sign in with existing one
- sign up for Essential access; you will need to verify a phone number for your Twitter account
- create a project and application (Essential account is limited to a single project and application)
- in application settings generate OAuth 2.0 Client ID and Client Secret; mind that you cannot view the secret again later, only regenerate it

#### Configure Strategy

The Twitter authentication strategy authenticates users using a Twitter OAuht2 access token.
The OAuth 2.0 Client ID and Client Secret obtained when creating
an application are supplied as options when creating the strategy. The strategy
also requires a `verify` callback, which receives the access token and
refresh token as arguments, as well as `profile` which contains the
authenticated user's Twitter profile. The `verify` callback must call `cb`
providing a user to complete authentication.

```javascript
passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ twitterId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'twitter'` strategy, to
authenticate requests.

Do not forget to configure scopes required by your application.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login',
    scope: ['tweet.read', 'tweet.write', 'users.read'],
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
```

## Development

When developing, start with cloning the repository using `git clone https://github.com/superfaceai/passport-twitter-oauth2.git`.

After cloning, the dependencies must be downloaded using `yarn install` or `npm install`.

Now the repository is ready for code changes.

The `package.json` also contains scripts (runnable by calling `yarn <script-name>` or `npm run <script-name>`):

- `format` - format the code (use `format:fix` to run autofix)
- `test` - run tests

## Maintainers

- [Jan Halama](https://github.com/janhalama)

## Kudos

- [Jared Hanson](https://github.com/jaredhanson) author of Passport.js

## Contributing

**Please open an issue first if you want to make larger changes**

Feel free to contribute! Please follow the [Contribution Guide](CONTRIBUTING.md).

Note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

`@superfaceai/passport-twitter-oauth2` project is licensed under the [MIT license](LICENSE).

© 2022 Superface s.r.o.
