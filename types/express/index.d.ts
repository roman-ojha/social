/* eslint-disable no-unused-vars */
declare namespace Express {
  export interface Request {
    token: string;
    rootUser: any;
    userID: string;
  }
}
