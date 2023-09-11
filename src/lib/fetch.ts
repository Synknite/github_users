import { Profile, User } from "./types";
export const BASE_URL = "https://api.github.com/users";
export const fetchUserList = async (): Promise<User[]> => {
  try {
    const response = await fetch(BASE_URL);
    // console.log(response.data);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchProfile = async (login: string): Promise<Profile> => {
  try {
    const url = BASE_URL + "/" + login;

    let response;
    response = await fetch(url);
    const profileRes = await response.json();
    response = await fetch(url + "/repos");
    const reopsRes = await response.json();
    response = await fetch(url + "/followers?per_page=5");
    const followsRes = await response.json();
    response = await fetch(url + "/orgs");
    const organizationRes = await response.json();
    const profile: Profile = {
      ...profileRes,
      repos: reopsRes,
      follows: followsRes,
      organizations: organizationRes,
    };
    return profile;
  } catch (error) {
    throw error;
  }
};
