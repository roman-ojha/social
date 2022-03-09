import imagemin from "imagemin";
import mozjpeg from "imagemin-mozjpeg";

const compressFile = async (filePath) => {
  await imagemin([filePath], {
    destination: "./db/build",
    plugins: [convertToJpg, mozjpeg({ quality: 70 })],
  });
};

export default compressFile;
