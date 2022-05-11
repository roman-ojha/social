import { instance as axios } from "../../axios";

export default {
  getNotificationData: async () => {
    return await axios({
      method: "GET",
      url: `/u/notification`,
      withCredentials: true,
    });
  },
};
