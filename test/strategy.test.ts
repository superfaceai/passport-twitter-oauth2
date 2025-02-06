import chai, { expect } from 'chai';

import { Strategy } from '../src/strategy';

describe('TwitterOAuth2Strategy', function () {
  describe('constructed', function () {
    it('should be named twitter', function () {
      const strategy = new Strategy(
        {
          clientType: 'confidential',
          clientID: 'ABC123',
          clientSecret: 'secret',
        },
        () => {}
      );
      chai.expect(strategy.name).to.equal('twitter');
    });
  });
});

describe('issuing authorization request', function () {
  describe('that redirects to service provider without redirect URI', () => {
    const strategy = new Strategy(
      {
        clientType: 'confidential',
        clientID: 'ABC123',
        clientSecret: 'secret',
      },
      function () {}
    );

    (strategy as any)._oauth2.getOAuthAccessToken = function (
      _extraParams: any,
      callback: (
        err: any,
        access_token: string,
        refresh_token: string,
        results: any
      ) => void
    ) {
      callback(null, 'hh5s93j4hdidpola', 'hdhd0244k9j7ao03', {});
    };

    let url: string;

    before(function (done) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      (chai as any).passport
        .use(strategy)
        .redirect(function (u: string) {
          url = u;
          done();
        })
        .request(function (req: any) {
          req.session = {};
        })
        .authenticate();
    });

    it('should be redirected', function () {
      const parsedUrl = new URL(url);

      expect(parsedUrl.host).to.equal('x.com');
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
    const strategy = new Strategy(
      {
        clientType: 'confidential',
        clientID: 'ABC123',
        clientSecret: 'secret',
        callbackURL: 'https://www.example.net/auth/example/callback',
      },
      function (_accessToken, _refreshToken, _profile, _done) {}
    );

    let url: string;

    before(function (done) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      (chai as any).passport
        .use(strategy)
        .error(() => {
          done();
        })
        .redirect((u: any, _s: any) => {
          url = u;
          done();
        })
        .request(function (req: any) {
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

  describe('that redirects to service provider with scope option passed in authenticate function', function () {
    const strategy = new Strategy(
      {
        clientType: 'confidential',
        clientID: 'ABC123',
        clientSecret: 'secret',
        callbackURL: 'https://www.example.net/auth/example/callback',
      },
      function (_accessToken, _refreshToken, _profile, _done) {}
    );

    let url: string;

    before(function (done) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      (chai as any).passport
        .use(strategy)
        .redirect(function (u: any) {
          url = u;
          done();
        })
        .request(function (req: any) {
          req.session = {};
        })
        .authenticate({ scope: ['tweet.read', 'tweet.write'] });
    });

    it('should be redirected with scope query parameter', function () {
      const parsedUrl = new URL(url);

      expect(parsedUrl.searchParams.get('scope')).to.equal(
        'tweet.read tweet.write'
      );
    });
  });

  describe('that redirects to service provider with scope option in strategy constructor', function () {
    const strategy = new Strategy(
      {
        clientType: 'confidential',
        clientID: 'ABC123',
        clientSecret: 'secret',
        callbackURL: 'https://www.example.net/auth/example/callback',
        skipUserProfile: true,
        scope: ['tweet.read', 'tweet.write'],
      },
      function (_accessToken, _refreshToken, _profile, _done) {}
    );

    describe('when not using scope option in authenticate function', function () {
      let url: string;

      before(function (done) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        (chai as any).passport
          .use(strategy)
          .redirect(function (u: any) {
            url = u;
            done();
          })
          .request(function (req: any) {
            req.session = {};
          })
          .authenticate();
      });

      it('should be redirected with scope query parameter set to tweet.read tweet.write', function () {
        const parsedUrl = new URL(url);

        expect(parsedUrl.searchParams.get('scope')).to.equal(
          'tweet.read tweet.write'
        );
      });
    });

    describe('when passing scopes via authenticate function options', function () {
      let url: string;

      before(function (done) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        (chai as any).passport
          .use(strategy)
          .redirect(function (u: any) {
            url = u;
            done();
          })
          .request(function (req: any) {
            req.session = {};
          })
          .authenticate({ scope: 'follows.read' });
      });

      it('should be redirected with scope query parameter set to authenticate option scopes', function () {
        const parsedUrl = new URL(url);

        expect(parsedUrl.searchParams.get('scope')).to.equal('follows.read');
      });
    });
  });

  describe('that redirects to service provider with skipUserProfile option disabled in strategy constructor', function () {
    const strategy = new Strategy(
      {
        clientType: 'confidential',
        clientID: 'ABC123',
        clientSecret: 'secret',
        callbackURL: 'https://www.example.net/auth/example/callback',
        skipUserProfile: false,
        scope: ['tweet.read', 'tweet.write'],
      },
      function (_accessToken, _refreshToken, _profile, _done) {}
    );

    let url: string;

    before(function (done) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      (chai as any).passport
        .use(strategy)
        .redirect(function (u: any) {
          url = u;
          done();
        })
        .request(function (req: any) {
          req.session = {};
        })
        .authenticate();
    });

    it('should be redirected with scope query parameter set to users.read tweet.read tweet.write', function () {
      const parsedUrl = new URL(url);

      expect(parsedUrl.searchParams.get('scope')).to.equal(
        'tweet.read tweet.write users.read'
      );
    });
  });
});
