import { UserDocumentBirthday } from "interface/userDocument";

export default {
  adminName: "social",
  adminUserID: "social",
  adminGender: "male",
  adminBirthday: <UserDocumentBirthday>{
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString(),
    day: new Date().getDate().toString(),
  },
};
