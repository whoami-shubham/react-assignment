import { URLS } from "./apiConfig";

export async function fetchUserData() {
  let result = [];
  try {
    const response = await fetch(URLS.USERS_DATA);
    result = await response.json();
    result.forEach((user) => {
      user.isLiked = false;
    });
  } catch (error) {
    console.log(error);
  }
  return result;
}
