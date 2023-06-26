const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    process.env.filename = file.originalname;
    cb(null, path.join(process.cwd() + "/src/api/public/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploads = multer({
  storage: storage,
  limits: { fieldSize: 300, fileSize: 10000000 },
}).single("image");

module.exports = uploads;
