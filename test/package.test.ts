import { expect } from 'chai';

import StrategyDefaultImport, { Strategy as StrategyNamedImport } from '..';

describe('@superfaceai/passport-twitter-oauth2 package', function () {
  describe('in TypeScript project', () => {
    it('should be able to import named Strategy constructor', function () {
      expect(StrategyNamedImport).to.be.a('function');
    });

    it('should able to import default Strategy constructor', function () {
      expect(StrategyDefaultImport).to.be.a('function');
      expect(StrategyDefaultImport).to.equal(StrategyNamedImport);
    });
  });
});
