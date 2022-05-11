// Here we are using firebase storage for storing images and files
// in this is not a client SDK so we have to use admin SDK to use firebase in nodejs
import admin from "firebase-admin";
import serviceAccount from "../constants/firebase_services_account.js";
// import { readFile } from "fs/promises";
// import serviceAccount from "./Firebase_serviceAccountKey.json";
// const serviceAccount = JSON.parse(
//   await readFile(new URL("./Firebase_serviceAccountKey.json", import.meta.url))
// );
const storageBucket = process.env.FIREBASE_STORAGEBUCKET;
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  storageBucket: storageBucket,
};
admin.initializeApp(firebaseConfig);
var defaultStorage = admin.storage();
export default defaultStorage;
