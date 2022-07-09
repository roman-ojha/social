import { instance as axios } from "../../axios";

const settingPageApi = {
  changeUserID: async (newUserID: string) => {
    return await axios({
      method: "POST",
      url: "/changeUserID",
      data: { newUserID: newUserID },
      withCredentials: true,
    });
  },
  changePassword: async (inputFieldData: {
    oldPassword: string;
    newPassword: string;
    cNewPassword: string;
  }) => {
    return await axios({
      method: "POST",
      url: "/changePassword",
      data: {
        oldPassword: inputFieldData.oldPassword,
        newPassword: inputFieldData.newPassword,
        cNewPassword: inputFieldData.cNewPassword,
      },
      withCredentials: true,
    });
  },
  changeName: async (newName: string) => {
    return await axios({
      method: "POST",
      url: "/changeName",
      data: { newName: newName },
      withCredentials: true,
    });
  },
  changeImageFileProfilePicture: async (data: FormData) => {
    return await axios({
      method: "POST",
      url: "/changeProfile/imgFile",
      data: data,
      withCredentials: true,
    });
  },
  changeImageUrlProfilePicture: async (imageUrl: string) => {
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

export default settingPageApi;
