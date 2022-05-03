import { Response } from "express";

export default interface ResponseObject extends Response {
  success: boolean;
  msg: string;
}
