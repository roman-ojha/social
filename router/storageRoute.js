import express from "express";
import storage from "../db/userStorageConnection.js";
const router = express.Router();
import upload from "../middleware/uploadFile.js";
import uuid from "uuid-v4";
const bucket = storage.bucket();
router.post("/u/post", upload.single("image"), async (req, res) => {
  const filename = req.file.filename;
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid(),
    },
    cacheControl: "public, max-age=31536000",
  };
  const file = await bucket.upload(req.file.path, {
    destination: `images/${filename}`,
    gzip: true,
    metadata: metadata,
  });
  console.log(file);
  res.send("Sending");
});

export default router;
