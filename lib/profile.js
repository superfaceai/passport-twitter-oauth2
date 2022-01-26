/**
 * Parse profile.
 *
 * @param {object|string} json
 * @return {object}
 * @api public
 */
exports.parse = json => {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }

  var profile = {};
  profile.id = String(json.id);
  profile.username = json.username;
  profile.displayName = json.name;
  profile.profileUrl = json.url;
  if (json.profile_image_url) {
    profile.photos = [{ value: json.profile_image_url }];
  }
  return profile;
};
