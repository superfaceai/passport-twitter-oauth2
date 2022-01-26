var Profile = require('../lib/profile'),
  fs = require('fs');

describe('Profile.parse', function () {
  describe('profile with image url', function () {
    var profile;

    before(function (done) {
      fs.readFile(
        'test/fixtures/example-profile.json',
        'utf8',
        function (err, data) {
          if (err) {
            return done(err);
          }
          profile = Profile.parse(data);
          done();
        }
      );
    });

    it('should parse profile ID', function () {
      expect(profile.id).to.equal('1466796521412771840');
    });

    it('should parse profile username', function () {
      expect(profile.username).to.equal('superface_test');
    });

    it('should parse profile display name', function () {
      expect(profile.displayName).to.equal('SF Tester');
    });

    it('should parse profile url', function () {
      expect(profile.profileUrl).to.equal('https://t.co/vzQlr4B6qB');
    });

    it('should parse profile image url', function () {
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal(
        'https://pbs.twimg.com/profile_images/1478302204306067462/5BEbrnPO_normal.jpg'
      );
    });
  });
});
