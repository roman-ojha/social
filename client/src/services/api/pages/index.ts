import { instance as axios } from "../../axios";

const index = {
  index: async () => {
    return await axios({
      method: "GET",
      url: "/index",
      // headers: {
      //   // Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
      // data: JSON.stringify({ token: getCookie("AuthToken") }),
      withCredentials: true,
    });
  },
};

export default index;
