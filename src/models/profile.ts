import * as passport from 'passport';

/**
 * @public
 */
export interface Profile extends passport.Profile {
  username: string;
  profileUrl: string;
}

/**
 * @public
 */
export interface ProfileWithMetaData extends Profile {
  _raw: string | Buffer | undefined;
  _json: unknown;
}
