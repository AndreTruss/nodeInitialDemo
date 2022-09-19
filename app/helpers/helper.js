const multer = require("multer");
const moment = require('moment');
const path = require("path");

moment.locale('es')
const date = moment().format().slice( 0, 16 );

const storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, "img");
  },
  filename: (req, file, cb) => {
  cb(null, file.fieldname + '_' + date + path.extname(file.originalname) );
  },
});
  
const fileFilter = (req, file, cb) => {
  if (
  file.mimetype === "image/png" ||
  file.mimetype === "image/jpg" ||
  file.mimetype === "image/jpeg" ||
  file.mimetype === "image/gif"
  ) {
  cb(null, true);
  } else {
  cb(new Error("File format should be PNG, JPG, JPEG, GIF"), false);
  }
};

const uploadImage = multer({ storage, fileFilter });

module.exports = uploadImage;