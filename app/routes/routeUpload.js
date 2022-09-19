const express = require("express");
const uploadImage = require("../helpers/helper");
const routerUpload = express.Router();

routerUpload.post('/upload', uploadImage.single('image'), ( req, res ) => {
  try {
      return res.status(201).json({ message: 'File uploaded successfully' });

  } catch (error) { console.log(error); }
});

module.exports = routerUpload;