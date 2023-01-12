# Twitter OAuth 2.0 Strategy for Passport

**`@superfaceai/passport-twitter-oauth2`**

[![npm](https://img.shields.io/npm/v/@superfaceai/passport-twitter-oauth2)](https://www.npmjs.com/package/@superfaceai/passport-twitter-oauth2)
[![license](https://img.shields.io/npm/l/@superfaceai/passport-twitter-oauth2)](LICENSE)
![TypeScript](https://img.shields.io/static/v1?message=TypeScript&&logoColor=ffffff&color=007acc&labelColor=5c5c5c&label=built%20with)
[![Discord](https://img.shields.io/discord/819563244418105354?logo=discord&logoColor=fff)](https://sfc.is/discord)

[Passport](http://passportjs.org/) strategy for authenticating with Twitter using [OAuth 2.0](https://developer.twitter.com/en/docs/authentication/oauth-2-0).

This module lets you authenticate using Twitter in your Node.js applications.
By plugging into Passport, Twitter authentication can be integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

[Twitter announced OAuth 2.0 general availability](https://twittercommunity.com/t/announcing-oauth-2-0-general-availability/163555) on December 14 2021 and encourages developers to use Twitter API v2.0 with OAuth 2.0 authentication.

Twitter OAuth 2.0 implementation specifics:

- [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) is required
- OAuth2 client credentials must be passed via `Authorization` header for `confidential` client types

## Install

```shell
npm install @superfaceai/passport-twitter-oauth2
```

## Usage

> **Note**
> Check our blog for a [complete tutorial with code explanation](https://superface.ai/blog/twitter-oauth2-passport?ref=github-passport-twitter-oauth2).

#### Create an Application

Before using `@superfaceai/passport-twitter-oauth2`, you must register a project and an application with Twitter by following these steps:

1. go to https://developer.twitter.com/ and either sign up for a new account or sign in with existing one
1. sign up for Essential access; you will need to verify a phone number for your Twitter account
1. create a project and application (Essential account is limited to a single project and application)
1. in application settings generate OAuth 2.0 Client ID and Client Secret; mind that you cannot view the secret again later, only regenerate it

#### Configure Strategy

Provide OAuth 2.0 Client ID and Client Secret (from previous step)
to the strategy constructor. The strategy
also requires a `verify` callback, which receives the access token and
refresh token as arguments, as well as `profile` which contains the
authenticated user's Twitter profile. The `verify` callback must call `cb`
providing a user to complete authentication.

```javascript
passport.use(
  new TwitterStrategy(
    {
      clientType: 'confidential', //depends on your Twitter app settings, valid values are `confidential` or `public`
      clientID: TWITTER_CLIENT_ID,
      clientSecret: TWITTER_CLIENT_SECRET,
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

For example, you can use `authenticate` function as an Express route middleware:

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

## Examples

Check the [examples](examples/) directory for minimal working projects:

- [Basic usage with plain JavaScript](examples/basic-usage/)
- [Usage with TypeScript](examples/with-typescript/)

## Where It's Being Used

- [twitter-demo](https://github.com/superfaceai/twitter-demo) – Demo of social media profiles for Twitter with [Superface OneSDK][one-sdk] uses this strategy to generate access tokens.
- [social-media-demo](https://github.com/superfaceai/social-media-demo) – Demo application handling access to multiple social media sites, content publishing, reading timelines and more.

## Related Projects

- [oauth2/refresh-token](https://superface.ai/oauth2/refresh-token?provider=twitter) – Profile for refreshing access tokens using [Superface OneSDK][one-sdk]
- [passport-oauth2](https://github.com/jaredhanson/passport-oauth2) – OAuth 2.0 strategy this package builds upon.
- [passport-twitter](https://github.com/jaredhanson/passport-twitter) – Legacy Twitter strategy which uses OAuth 1.0a.
- [passport-twitter-oauth2](https://github.com/balanced-mt/passport-twitter-oauth2) – Original OAuth 2.0 Twitter strategy, no longer maintained.

## Development

When developing, start with cloning the repository using `git clone https://github.com/superfaceai/passport-twitter-oauth2.git`.

After cloning, install the dependencies with `npm i`.

Now the repository is ready for code changes.

The `package.json` also contains scripts (runnable by calling `npm run <script-name>`):

- `build` - transpile TypeScript into JavaScript
- `format` - check the code formatting
- `format:fix` - fix the code formatting
- `lint` - run linter
- `test` - run tests

## Contributing

**Please open an issue first if you want to make larger changes**

Feel free to contribute! Please follow the [Contribution Guide](CONTRIBUTING.md).

## Maintainers

- [Jan Halama](https://github.com/janhalama)
- [Jan Vlnas](https://github.com/jnv)

## License

`@superfaceai/passport-twitter-oauth2` project is licensed under the [MIT license](LICENSE).

© 2023 Superface s.r.o.

[one-sdk]: https://github.com/superfaceai/one-sdk-js
