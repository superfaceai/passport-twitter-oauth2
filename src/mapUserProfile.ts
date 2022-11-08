import { Profile } from './models/profile';
import { TwitterUserInfo } from './models/twitterUserInfo';

export const mapUserProfile = (json: string | TwitterUserInfo): Profile => {
  let parsedJson: TwitterUserInfo;
  if ('string' === typeof json) {
    parsedJson = JSON.parse(json) as unknown as TwitterUserInfo;
  } else {
    parsedJson = json;
  }

  const photos = parsedJson.profile_image_url
    ? [{ value: parsedJson.profile_image_url }]
    : [];
  const profile: Profile = {
    provider: 'twitter',
    id: parsedJson.id,
    username: parsedJson.username,
    displayName: parsedJson.name,
    profileUrl: parsedJson.url,
    photos,
  };

  return profile;
};
