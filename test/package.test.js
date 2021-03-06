var strategy = require('..');

describe('@superfaceai/passport-twitter-oauth2', function () {
  it('should export Strategy constructor', function () {
    expect(strategy.Strategy).to.be.a('function');
  });

  it('should export Strategy constructor as module', function () {
    expect(strategy).to.be.a('function');
    expect(strategy).to.equal(strategy.Strategy);
  });
});
