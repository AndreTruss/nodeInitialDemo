const express = require("express");
const { createFolder } = require("../helpers/helper");
const { uploadImage } = require("../middlewares/middleware");
const routerUpload = express.Router();

createFolder();

routerUpload.post('/upload', uploadImage );

module.exports = routerUpload;