import { instance as axios } from "../../axios";

const mainPageMsgAndNtfBar = {
  getNotificationData: async () => {
    return await axios({
      method: "GET",
      url: "/u/notification",
      withCredentials: true,
    });
  },
};

export default mainPageMsgAndNtfBar;
