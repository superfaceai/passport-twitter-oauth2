/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// Strategy default and named export.
import { Strategy } from './strategy';

export type {
  Profile,
  ProfileWithMetaData,
  StrategyOptions,
  StrategyOptionWithRequest,
  AuthenticateOptions,
} from './models';

exports = module.exports = Strategy;
exports.Strategy = Strategy;
// export = TwitterOAuth2Strategy;
