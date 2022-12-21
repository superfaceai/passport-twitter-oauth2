/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Strategy } from './strategy';

export type {
  Profile,
  ProfileWithMetaData,
  StrategyOptions,
  StrategyOptionWithRequest,
  AuthenticateOptions,
} from './models';
export { Strategy };

exports = module.exports = Strategy;
exports.Strategy = Strategy;
