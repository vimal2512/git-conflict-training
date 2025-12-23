// validation middleware

import multer from "multer";
import path from "path";

// store file temporarily
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  }
});

const upload = multer({ storage });

export default upload;
