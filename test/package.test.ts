import { expect } from 'chai';

import * as strategy from '../dist';

describe('@superfaceai/passport-twitter-oauth2', function () {
  it('should export Strategy constructor', function () {
    expect(strategy.Strategy).to.be.a('function');
  });
});
