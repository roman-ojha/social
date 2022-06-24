import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.API_BASE_URL,
});

// eslint-disable-next-line import/prefer-default-export
export { instance };
