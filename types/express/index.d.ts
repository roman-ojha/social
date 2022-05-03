declare namespace Express {
  export interface Request {
    token: string;
    rootUser: {
      userID: string;
      picture: string;
    };
    userID: string;
  }
}
