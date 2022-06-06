import { instance as axios } from "../../axios";

export default {
  changeUserID: async (newUserID) => {
    return await axios({
      method: "POST",
      url: "/changeUserID",
      data: { newUserID: newUserID },
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
  changeName: async (newName) => {
    return await axios({
      method: "POST",
      url: "/changeName",
      data: { newName: newName },
      withCredentials: true,
    });
  },
  changeImageFileProfilePicture: async (data) => {
    return await axios({
      method: "POST",
      url: "/changeProfile/imgFile",
      data: data,
      withCredentials: true,
    });
  },
  changeImageUrlProfilePicture: async (imageUrl) => {
    return await axios({
      method: "POST",
      url: "/changeProfile/imgUrl",
      data: {
        imageUrl,
      },
      withCredentials: true,
    });
  },
};
