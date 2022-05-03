declare namespace Express {
  export interface Request {
    token: string;
    rootUser: any;
    userID: string;
  }
}
