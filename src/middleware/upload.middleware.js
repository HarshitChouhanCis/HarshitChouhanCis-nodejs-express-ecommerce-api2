import multer from "multer";

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
// });

// export default upload;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

export default upload;