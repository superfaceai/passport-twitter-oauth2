import { expect } from 'chai';

import StrategyDefaultImport, {
  Strategy as StrategyNamedImport,
} from '../dist';

describe('@superfaceai/passport-twitter-oauth2', function () {
  it('should export named Strategy constructor', function () {
    expect(StrategyNamedImport).to.be.a('function');
  });

  it('should export default Strategy constructor', function () {
    expect(StrategyDefaultImport).to.be.a('function');
    expect(StrategyDefaultImport).to.equal(StrategyNamedImport);
  });
});
