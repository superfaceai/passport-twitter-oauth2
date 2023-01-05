import type { Profile as PassportProfile } from 'passport';

/**
 * @public
 */
export interface Profile extends PassportProfile {
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
