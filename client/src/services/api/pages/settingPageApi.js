import { instance as axios } from "../../axios";

export default {
  changeUserID: async (settingInputFieldData) => {
    return await axios({
      method: "POST",
      url: "/changeUserID",
      data: { newUserID: settingInputFieldData.userID },
      withCredentials: true,
    });
  },
  changePassword: async (settingInputFieldData) => {
    return await axios({
      method: "POST",
      url: "/changePassword",
      data: {
        oldPassword: settingInputFieldData.oldPassword,
        newPassword: settingInputFieldData.newPassword,
        cNewPassword: settingInputFieldData.cNewPassword,
      },
      withCredentials: true,
    });
  },
  changeName: async (settingInputFieldData) => {
    return await axios({
      method: "POST",
      url: "/changeName",
      data: { newName: settingInputFieldData.name },
      withCredentials: true,
    });
  },
  changeImageUrlProfilePicture: async (data) => {
    return await axios({
      method: "POST",
      url: "/changeProfile/imgFile",
      data: data,
      withCredentials: true,
    });
  },
};
