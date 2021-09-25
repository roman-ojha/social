// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config({ path: "../config.env" });

// const DB = process.env.USERSTORAGEDATABASE;

// const stgConn = mongoose.createConnection(DB);

// export default stgConn;

// -----------------------------------------

// Here we are using firebase storage for storing images and files
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase";
import admin from "firebase-admin";
import { readFile } from "fs/promises";
// import serviceAccount from "./Firebase_serviceAccountKey.json";
const serviceAccount = JSON.parse(
  await readFile(new URL("./Firebase_serviceAccountKey.json", import.meta.url))
);
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "social-application-326411.appspot.com",
};

admin.initializeApp(firebaseConfig);
// var defaultStorage = admin.storage().bucket();
var defaultStorage = admin.storage();
// const analytics = getAnalytics(app);
// firebase.analytics();

export default defaultStorage;
