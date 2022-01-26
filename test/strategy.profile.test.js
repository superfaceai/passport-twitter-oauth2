var TwitterOAuth2Strategy = require('../lib/strategy');

describe('TwitterOAuth2Strategy#userProfile', function () {
  describe('fetched from default endpoint', function () {
    var strategy = new TwitterOAuth2Strategy(
      {
        clientID: 'ABC123',
        clientSecret: 'secret',
      },
      function () {}
    );

    strategy._oauth2.get = function (url, accessToken, callback) {
      if (
        url !=
        'https://api.twitter.com/2/users/me?user.fields=profile_image_url,url'
      ) {
        return callback(new Error('incorrect url argument'));
      }
      if (accessToken != 'token') {
        return callback(new Error('incorrect token argument'));
      }

      var body =
        '{"data": {"username": "superface_test","profile_image_url": "https://pbs.twimg.com/profile_images/1478302204306067462/5BEbrnPO_normal.jpg","id": "1466796521412771840","name": "SF Tester","url": "https://t.co/vzQlr4B6qB"}}';
      callback(null, body, undefined);
    };

    var profile;

    before(function (done) {
      strategy.userProfile('token', function (err, p) {
        if (err) {
          return done(err);
        }
        profile = p;
        done();
      });
    });

    it('should parse profile', function () {
      expect(profile.provider).to.equal('twitter');

      expect(profile.id).to.equal('1466796521412771840');
      expect(profile.username).to.equal('superface_test');
      expect(profile.displayName).to.equal('SF Tester');
      expect(profile.profileUrl).to.equal('https://t.co/vzQlr4B6qB');
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal(
        'https://pbs.twimg.com/profile_images/1478302204306067462/5BEbrnPO_normal.jpg'
      );
    });

    it('should set raw property', function () {
      expect(profile._raw).to.be.a('string');
    });

    it('should set json property', function () {
      expect(profile._json).to.be.an('object');
    });
  });
});
