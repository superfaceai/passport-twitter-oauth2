export interface TwitterUserInfoResponse {
  data: TwitterUserInfo;
}

export interface TwitterUserInfo {
  id: string;
  name: string;
  username: string;
  profile_image_url?: string;
  url: string;
}
