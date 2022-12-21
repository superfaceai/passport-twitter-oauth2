/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
const { Strategy: StrategyNamedImport } = require('../dist/index.cjs');
const StrategyDefaultImport = require('../dist/index.cjs');

describe('@superfaceai/passport-twitter-oauth2 package', function () {
  describe('in CommonJS project', () => {
    it('should be able to require named Strategy constructor', function () {
      expect(StrategyNamedImport).to.be.a('function');
    });

    it('should be able to require default Strategy constructor', function () {
      expect(StrategyDefaultImport).to.be.a('function');
      expect(StrategyDefaultImport).to.equal(StrategyNamedImport);
    });
  });
});
