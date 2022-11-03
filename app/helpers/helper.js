const multer = require("multer");
const moment = require('moment');
const path = require("path");
const fs = require('fs');

const createFolder = () => {
  if (!fs.existsSync('img')) {
    
    fs.mkdir('img', error => {
      if (error) console.log(error.message);
        console.log("Folder created.")
    });
  }
}

moment.locale('es')
const date = moment().format().slice( 0, 16 );

const storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, "img/");
  },
  filename: (req, file, cb) => {
  cb(null, file.fieldname + '_' + date + path.extname(file.originalname) );
  },
});
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true);
    } else {
    req.fileFormatError = true;
    cb(null, false);
  }
};

module.exports = { storage, fileFilter, createFolder };