import {
  StrategyOptions as PassportOAuth2StrategyOptions,
  StrategyOptionsWithRequest as PassportOAuth2StrategyOptionsWithRequest,
} from 'passport-oauth2';

interface TwitterStrategyOptionsBase {
  clientType: 'public' | 'confidential' | 'private'; // OAuth 2.0 client types as defined here: https://datatracker.ietf.org/doc/html/rfc6749#section-2.1 and configured in Twitter developer portal
  clientID: string;
  clientSecret: string;
  userProfileURL?: string | undefined;
  authorizationURL?: string | undefined;
  tokenURL?: string | undefined;
}

export interface StrategyOptions
  extends TwitterStrategyOptionsBase,
    Omit<PassportOAuth2StrategyOptions, 'authorizationURL' | 'tokenURL'> {
  passReqToCallback?: false | undefined;
}

export interface StrategyOptionWithRequest
  extends TwitterStrategyOptionsBase,
    Omit<
      PassportOAuth2StrategyOptionsWithRequest,
      'authorizationURL' | 'tokenURL'
    > {
  passReqToCallback: true;
}
