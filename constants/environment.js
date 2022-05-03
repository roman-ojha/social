import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  API_BASE_URL: process.env.API_BASE_URL,
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
  USERDATABASE: process.env.USERDATABASE,
  SECRET_KEY: process.env.SECRET_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
};
