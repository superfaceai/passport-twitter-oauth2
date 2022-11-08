import * as passport from 'passport';

export interface Profile extends passport.Profile {
  username: string;
  profileUrl: string;
}

export interface ProfileWithMetaData extends Profile {
  _raw: string | Buffer | undefined;
  _json: unknown;
}
