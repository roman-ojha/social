/* eslint-disable import/no-unresolved */
import imagemin from "imagemin";
import mozjpeg from "imagemin-mozjpeg";
import convertToJpg from "./convertToJpg.js";

const compressFile = async (filePath) => {
  await imagemin([filePath], {
    destination: "./db/build",
    plugins: [convertToJpg, mozjpeg({ quality: 70 })]
  });
};

export default compressFile;
