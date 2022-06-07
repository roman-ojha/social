import { instance as axios } from "../../axios";

const mainPageSideBar = {
  logOut: async () => {
    return await axios({
      method: "GET",
      url: "/u/logout",
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

export default mainPageSideBar;
