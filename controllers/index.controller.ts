import { Request, Response } from "express";
import ResponseObject from "../interface/responseObject.js";

export default {
  index: (req: Request, res: Response) => {
    try {
      return res.redirect(process.env.CLIENT_BASE_URL!);
    } catch (err) {
      return res.status(500).json(<ResponseObject>{
        success: false,
        msg: "Server Error, please try again later",
      });
    }
  },
};
