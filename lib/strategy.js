// Load modules.
var OAuth2Strategy = require('passport-oauth2'),
  util = require('util'),
  uri = require('url'),
  Profile = require('./profile'),
  InternalOAuthError = require('passport-oauth2').InternalOAuthError;

/**
 * `Strategy` constructor.
 *
 * The Twitter authentication strategy authenticates requests by delegating to
 * Twitter using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `cb`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Twitter application's App ID
 *   - `clientSecret`  your Twitter application's App Secret
 *   - `callbackURL`   URL to which Twitter will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new TwitterStrategy({
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
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL =
    options.authorizationURL || 'https://twitter.com/i/oauth2/authorize';
  options.sessionKey = options.sessionKey || 'oauth:twitter';
  options.tokenURL =
    options.tokenURL || 'https://api.twitter.com/2/oauth2/token';
  options.scope = Array.from(new Set(['users.read', ...(options.scope || [])]));

  // Twitter requires clients to use PKCE (RFC 7636)
  options.pkce = true;

  // PKCE with Passport requires to enable sessions
  options.state = true;

  if (options.clientType === 'private') {
    // Twitter requires that OAuth2 client credentials are passed in Authorization header for private client types. This is workaround as passport-oauth2 and node-oauth libs doesn't support it.
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

  OAuth2Strategy.call(this, options, verify);
  this.name = 'twitter';
  this._userProfileURL =
    options.userProfileURL ||
    'https://api.twitter.com/2/users/me?user.fields=profile_image_url,url';
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from Twitter.
 *
 * This function constructs a normalized profile, with the following properties parsed from Twitter profile:
 *
 *   - `id`
 *   - `username`
 *   - `displayName`
 *   - `profileUrl`
 *   - `photos`
 *
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
Strategy.prototype.userProfile = function (accessToken, done) {
  var json;

  var url = new URL(this._userProfileURL);
  url.query = url.query || {};

  this._oauth2.useAuthorizationHeaderforGET(true);
  this._oauth2.get(url.toString(), accessToken, function (err, body, res) {
    if (err) {
      if (err.data) {
        try {
          json = JSON.parse(err.data);
        } catch (_) {
          return done(
            new InternalOAuthError('Failed to fetch user profile', err)
          );
        }
      }

      if (json && json.errors && json.errors.length) {
        var e = json.errors[0];
        return done(new Error(e.message, e.code));
      }
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    var profile = Profile.parse(json.data);
    profile.provider = 'twitter';
    profile._raw = body;
    profile._json = json.data;

    done(null, profile);
  });
};

/**
 * Parse error response from Twitter OAuth2 endpoint.
 *
 * @param {string} body
 * @param {number} status
 * @return {Error}
 * @access protected
 */
Strategy.prototype.parseErrorResponse = function (body, status) {
  var json;

  json = JSON.parse(body);
  if (Array.isArray(json.errors) && json.errors.length > 0) {
    return new Error(json.errors[0].message);
  }
};

// Expose constructor.
module.exports = Strategy;
