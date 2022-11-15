import { Strategy as TwitterOAuth2Strategy } from './strategy';

export type {
  Profile,
  ProfileWithMetaData,
  StrategyOptions,
  StrategyOptionWithRequest,
  AuthenticateOptions,
} from './models';

export const Strategy = TwitterOAuth2Strategy;
export default TwitterOAuth2Strategy;
