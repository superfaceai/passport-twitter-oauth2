import { StrategyOptions, StrategyOptionsWithRequest } from 'passport-oauth2';

interface TwitterStrategyOptionsBase {
  clientType: 'public' | 'confidential' | 'private'; // OAuth 2.0 client types as defined here: https://datatracker.ietf.org/doc/html/rfc6749#section-2.1 and configured in Twitter developer portal
  clientID: string;
  clientSecret: string;
  userProfileUrl?: string;
}

export interface StrategyOption
  extends TwitterStrategyOptionsBase,
    StrategyOptions {
  passReqToCallback?: false | undefined;
}

export interface StrategyOptionWithRequest
  extends TwitterStrategyOptionsBase,
    StrategyOptionsWithRequest {
  passReqToCallback: true;
}
