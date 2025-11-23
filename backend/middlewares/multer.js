import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "tmp"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

function fileFilter(req, file, cb) {
  const allowedExtensions = [".mp3", ".wav", ".jpg", ".jpeg", ".png", ".webp"];
  const ext = path.extname(file.originalname).toLocaleLowerCase();
  const isMimeTypeValid =
    file.mimetype.startsWith("audio/") || file.mimetype.startsWith("image/");
  const isExtensionValid = allowedExtensions.includes(ext);

  if (isMimeTypeValid && isExtensionValid) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error("Invalid file Type"));
  }
}

const upload = multer({ storage: storage, fileFilter });

export default upload;
