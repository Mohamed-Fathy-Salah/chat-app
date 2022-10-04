import multer from "multer";

// todo: upload to online host and save url
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/chat");
  },
  filename: function (req, file, cb) {
    const newFileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, newFileName);
  },
});

export const upload = multer({ storage: Storage });
