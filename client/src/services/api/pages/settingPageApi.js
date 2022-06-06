import { instance as axios } from "../../axios";

export default {
  changeUserID: async (settingInputFieldData) => {
    console.log(settingInputFieldData);
    return await axios({
      method: "POST",
      url: "/changeUserID",
      data: { newUserID: settingInputFieldData },
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
