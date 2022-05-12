import { instance as axios } from "../../axios";

export default {
  logOut: async () => {
    return await axios({
      method: "GET",
      url: "/u/logout",
      withCredentials: true,
    });
  },
  getFriendData: async (userID) => {
    return await axios({
      method: "GET",
      url: `/u/profile/${userID}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
  getSearchedUserData: async (userID) => {
    return axios({
      method: "POST",
      url: `/u/search`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ userID }),
      withCredentials: true,
    });
  },
};
