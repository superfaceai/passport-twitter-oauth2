const { expect } = require('chai');
const chai = require('chai');
const uri = require('url');
TwitterOAuth2Strategy = require('../lib/strategy');

describe('TwitterOAuth2Strategy', function () {
  describe('constructed', function () {
    it('should be named twitter', function () {
      const strategy = new TwitterOAuth2Strategy(
        {
          clientID: 'ABC123',
          clientSecret: 'secret',
        },
        () => {}
      );
      expect(strategy.name).to.equal('twitter');
    });
  });

  describe('constructed with undefined options', function () {
    it('should throw', function () {
      expect(() => {
        new TwitterOAuth2Strategy(undefined, function () {});
      }).to.throw(Error);
    });
  });

  describe('constructed without a verify callback', function () {
    it('should throw', function () {
      expect(function () {
        new TwitterOAuth2Strategy({
          clientID: 'ABC123',
          clientSecret: 'secret',
        });
      }).to.throw(TypeError, 'OAuth2Strategy requires a verify callback');
    });
  });
});

describe('issuing authorization request', function () {
  describe('that redirects to service provider without redirect URI', () => {
    var strategy = new TwitterOAuth2Strategy(
      {
        clientID: 'ABC123',
        clientSecret: 'secret',
      },
      function () {}
    );

    strategy._oauth2.getOAuthAccessToken = function (extraParams, callback) {
      callback(null, 'hh5s93j4hdidpola', 'hdhd0244k9j7ao03', {});
    };

    var url;

    before(function (done) {
      const test = chai.passport
        .use(strategy)
        .redirect(function (u) {
          url = u;
          done();
        })
        .request(function (req) {
          req.session = {};
        })
        .authenticate();
    });

    it('should be redirected', function () {
      const parsedUrl = new URL(url);

      expect(parsedUrl.host).to.equal('twitter.com');
      expect(parsedUrl.pathname).to.equal('/i/oauth2/authorize');
      expect(parsedUrl.searchParams.get('response_type')).to.equal('code');
      expect(parsedUrl.searchParams.get('code_challenge')).to.exist;
      expect(parsedUrl.searchParams.get('state')).to.exist;
      expect(parsedUrl.searchParams.get('code_challenge_method')).to.equal(
        'S256'
      );
      expect(parsedUrl.searchParams.get('client_id')).to.equal('ABC123');
    });
  });

  describe('that redirects to service provider with redirect URI', function () {
    var strategy = new TwitterOAuth2Strategy(
      {
        clientID: 'ABC123',
        clientSecret: 'secret',
        callbackURL: 'https://www.example.net/auth/example/callback',
      },
      function (accessToken, refreshToken, profile, done) {}
    );

    var url;

    before(function (done) {
      chai.passport
        .use(strategy)
        .error(e => {
          done();
        })
        .redirect((u, s) => {
          url = u;
          done();
        })
        .request(function (req) {
          req.session = {};
        })
        .authenticate();
    });

    it('should be redirected with redirect query parameter', function () {
      const parsedUrl = new URL(url);

      expect(parsedUrl.searchParams.get('redirect_uri')).to.equal(
        'https://www.example.net/auth/example/callback'
      );
    });
  });

  describe('that redirects to service provider with scope option', function () {
    var strategy = new TwitterOAuth2Strategy(
      {
        clientID: 'ABC123',
        clientSecret: 'secret',
        callbackURL: 'https://www.example.net/auth/example/callback',
      },
      function (accessToken, refreshToken, profile, done) {}
    );

    var url;

    before(function (done) {
      chai.passport
        .use(strategy)
        .redirect(function (u) {
          url = u;
          done();
        })
        .request(function (req) {
          req.session = {};
        })
        .authenticate({ scope: 'email' });
    });

    it('should be redirected with scope query parameter', function () {
      const parsedUrl = new URL(url);

      expect(parsedUrl.searchParams.get('scope')).to.equal('email');
    });
  });
});
