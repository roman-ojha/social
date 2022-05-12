declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    API_BASE_URL: string;
    CLIENT_BASE_URL: string;
    USERDATABASE: string;
    SECRET_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    YOUTUBE_API_URL: string;
    YOUTUBE_BASE_API_KEY: string;
    FIREBASE_STORAGEBUCKET: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_PRIVATE_KEY_ID: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_CLIENT_ID: string;
    FIREBASE_X509_CERT_URL: string;
  }
}
