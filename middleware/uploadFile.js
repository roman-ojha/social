const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
// const imagemin = require("imagemin");
// const isJpg = require("is-jpg");
// const sharp = require("sharp");
// const monzjpeg = require("imagemin-mozjpeg");

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

const storage = new GridFsStorage({
  url: process.env.USERSTORAGEDATABASE,
  file: (req, file) => {
    // file = compressImage(file);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, async (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "userstorage",
        };
        req = req;
        req.filename = filename;
        req.file = file;
        resolve(fileInfo);
      });
    });
  },
});

// const filename = `${Date.now()}-any-name-${file.originalname}`;
module.exports = multer({ storage });
