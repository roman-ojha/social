import { instance as axios } from "../../axios";

export default {
  index: async () => {
    return await axios({
      method: "GET",
      url: "/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      withCredentials: true,
    });
  },
};
