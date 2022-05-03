declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    API_BASE_URL: string;
    CLIENT_BASE_URL: string;
    USERDATABASE: string;
    SECRET_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    FIREBASE_STORAGEBUCKET: string;
    TEST: "Roman Test";
  }
}
