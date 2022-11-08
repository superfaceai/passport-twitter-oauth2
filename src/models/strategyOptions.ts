import { OutgoingHttpHeaders } from 'http';
import { StateStore } from 'passport-oauth2';

interface StrategyOptionsBase {
  clientType: 'public' | 'confidential' | 'private'; //OAhut 2.0 client types as defined here: https://datatracker.ietf.org/doc/html/rfc6749#section-2.1 and configured in Twitter developer portal
  clientID: string;
  clientSecret: string;
  userProfileUrl?: string;
  authorizationURL?: string;
  tokenURL?: string;
  callbackURL?: string | undefined;
  customHeaders?: OutgoingHttpHeaders | undefined;
  scope?: string | string[] | undefined;
  scopeSeparator?: string | undefined;
  sessionKey?: string | undefined;
  store?: StateStore | undefined;
  state?: unknown;
  skipUserProfile?: unknown;
  pkce?: boolean | undefined;
  proxy?: unknown;
}

export interface StrategyOption extends StrategyOptionsBase {
  passReqToCallback?: false | undefined;
}

export interface StrategyOptionWithRequest extends StrategyOptionsBase {
  passReqToCallback: true;
}
