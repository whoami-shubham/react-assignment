import { fetchUserData } from "../services/users";

const initialState = {
  users: [],
};

export const loadStateFromLocalStorage = async () => {
  try {
    const serializedState = localStorage.getItem("data");
    const isStateEmpty =
      serializedState === null || serializedState === undefined;
    const result = !isStateEmpty ? JSON.parse(serializedState) : null;
    // if there is no data present in localStorage fetch from API
    if (isStateEmpty || !result || !result.users || !result.users.length) {
      const usersData = await fetchUserData();
      const state = { users: usersData };
      saveStateIntoLocalStorage(state);
      return state;
    }

    return result;
  } catch (error) {
    console.log("error : ", error);
    return initialState;
  }
};

export function saveStateIntoLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("data", serializedState);
  } catch (error) {
    console.log(error);
  }
}

export function clearState() {
  try {
    localStorage.removeItem("data");
  } catch (error) {
    console.log(error);
  }
}

export function cloneObject(object) {
  if (!object) {
    return object;
  }
  return JSON.parse(JSON.stringify(object));
}
