import UserDocument from "./userDocument";

export default interface SchemaMethodInstance extends UserDocument {
  generateAuthToken: () => string | null;
  uploadPost: (
    postData: object,
    userStoryDetail: object | undefined
  ) => Promise<object>;
  followUser: (followedToUser: object) => boolean;
  saveMessage: () => {};
}
