import { lowerCase } from "lower-case";

const makeStandardUserID = (userID: string) => {
  const afterLowerCase = lowerCase(userID);
  return afterLowerCase.trim();
};

export default makeStandardUserID;
