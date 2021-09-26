import multer from "multer";
import crypto from "crypto";
import path from "path";
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buf) => {
      const filename = buf.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});
export default multer({ storage });
