declare namespace Express {
  export interface Request {
    token: string;
    rootUser: string;
    userID: string;
  }
}
