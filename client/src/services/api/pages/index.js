import { instance as axios } from "../../axios";
import { getCookie } from "../../../functions/cookies";

export default {
  index: async () => {
    return await axios({
      method: "GET",
      url: "/",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      // data: JSON.stringify({ token: getCookie("AuthToken") }),
      withCredentials: true,
    });
  },
};
