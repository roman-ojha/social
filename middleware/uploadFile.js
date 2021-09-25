// import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
// import crypto from "crypto";
// import path from "path";
// import imagemin from "imagemin";
// import isJpg from "is-jpg";
// import sharp from "sharp";
// import monzjpeg from "imagemin-mozjpeg";

// const convertToJpg = async (input) => {
//   if (isJpg(input)) {
//     return input;
//   }
//   return sharp(input).jpeg().toBuffer();
// };

// const compressImage = async (file) => {
//   const minifile = await imagemin(file, {
//     plugins: [convertToJpg, monzjpeg({ quality: 65 })],
//   });
//   return minifile;
// };

// const storage = new GridFsStorage({
//   url: process.env.USERSTORAGEDATABASE,
//   file: (req, file) => {
//     // file = compressImage(file);
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, async (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "userstorage",
//         };
//         req = req;
//         req.filename = filename;
//         req.file = file;
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// // const filename = `${Date.now()}-any-name-${file.originalname}`;
// export default multer({ storage });

import multer from "multer";
import crypto from "crypto";
import path from "path";
const storage1 = multer.diskStorage({
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buf) => {
      const filename = buf.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});
export default multer({ storage: storage1 });
