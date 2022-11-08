import { Strategy as OAuth2Strategy } from 'passport-oauth2';

import { mapUserProfile } from './mapUserProfile';
import { Profile, ProfileWithMetaData } from './models/profile';
import { StrategyOption } from './models/strategyOptions';
import { TwitterError } from './models/twitterError';
import { TwitterUserInfoResponse } from './models/twitterUserInfo';


export class Strategy extends OAuth2Strategy {
  _userProfileURL: string;

  /**
 * Twitter strategy constructor
 * 
 * The Twitter authentication strategy authenticates requests by delegating to
 * Twitter using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `cb`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Required options:
 *   - `clientID`      your Twitter application's App ID
 *   - `clientSecret`  your Twitter application's App Secret
 *   - `callbackURL`   URL to which Twitter will redirect the user after granting authorization
 *   - `clientType`    your Twitter application (client) type, either `public` or `confidental`
 *
 * Examples:
 *
 *     passport.use(new TwitterStrategy({
 *         clientType: 'confidential',
 *         clientID: 'client-identification',
 *         clientSecret: 'secret'
 *         callbackURL: 'https://www.example.net/auth/twitter/callback'
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 */
  constructor(
    options: StrategyOption,
    verify: (accessToken: string, refreshToken: string, profile: Profile, done: (error: Error, user?: ProfileWithMetaData) => void) => void) {

    options = options || {};
    options.sessionKey = options.sessionKey || 'oauth:twitter';
    const authorizationURL = options.authorizationURL || 'https://twitter.com/i/oauth2/authorize';
    const tokenURL = options.tokenURL || 'https://api.twitter.com/2/oauth2/token';

    let scope = options.scope || [];
    if ('string' === typeof scope) {
      scope = [scope];
    }
    options.scope = Array.from(new Set(scope));

    // Twitter requires clients to use PKCE (RFC 7636)
    options.pkce = true;

    // PKCE with Passport requires to enable sessions
    options.state = true;

    if (options.clientType === 'confidential' || options.clientType === 'private') { //private client type is deprecated
      // Twitter requires that OAuth2 client credentials are passed in Authorization header for confidential client types.
      // This is workaround as passport-oauth2 and node-oauth libs doesn't support it.
      // See Twitter docs: https://developer.twitter.com/en/docs/authentication/oauth-2-0/user-access-token
      options.customHeaders = {
        ...{
          Authorization:
            'Basic ' +
            Buffer.from(`${options.clientID}:${options.clientSecret}`).toString(
              'base64'
            ),
        },
        ...(options.customHeaders || {}),
      };
    } else {
      options.customHeaders || {};
    }

    super({
      ...options,
      authorizationURL,
      tokenURL
    }, verify);

    this.name = 'twitter';
    this._userProfileURL =
      options.userProfileUrl ||
      'https://api.twitter.com/2/users/me?user.fields=profile_image_url,url';
  }

  /**
   * Retrieve user profile from Twitter.
   *
   * This function fetches Twitter user info and maps it to normalized profile,
   * with the following properties parsed from Twitter user info response:
   *
   *   - `id`
   *   - `username`
   *   - `displayName`
   *   - `profileUrl`
   *   - `photos`
   */
  userProfile(accessToken: string, done: (error: Error | null, user?: ProfileWithMetaData) => void) {
    const url = new URL(this._userProfileURL);

    this._oauth2.useAuthorizationHeaderforGET(true);
    this._oauth2.get(url.toString(), accessToken, function (err, body, _res) {
      if (err) {
        let twitterError: TwitterError | undefined = undefined;
        if (err.data && typeof (err.data) === 'string') {
          try {
            twitterError = JSON.parse(err.data) as unknown as TwitterError;
          } catch (_) {
            return done(
              new OAuth2Strategy.InternalOAuthError('Failed to fetch user profile', err)
            );
          }
        }

        if (twitterError && twitterError.errors && twitterError.errors.length) {
          const e = twitterError.errors[0];

          return done(new Error(e.message, { cause: { code: e.code } }));
        }

        return done(new OAuth2Strategy.InternalOAuthError('Failed to fetch user profile', err));
      }

      if (body === undefined) {
        return done(new Error('Failed to fetch valid user profile'));
      }

      let twitterUserInfoResponse: TwitterUserInfoResponse;

      try {
        body = body === typeof ('string') ? body : body.toString();
        twitterUserInfoResponse = JSON.parse(body) as unknown as TwitterUserInfoResponse;
      } catch (ex) {
        return done(new Error('Failed to parse user profile'));
      }

      const userProfile = mapUserProfile(twitterUserInfoResponse.data);

      const userProfileWithMetadata: ProfileWithMetaData = {
        ...userProfile,
        _raw: body,
        _json: twitterUserInfoResponse.data
      }

      done(null, userProfileWithMetadata);
    });
  }
}