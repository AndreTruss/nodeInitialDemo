const noCacheMiddleware = (req, res ,next) => {

  try {
    res.set('Cache-control', 'no-cache')
    next()
  } catch (err) { next(err) }
}

const notFoundRoute = ( req, res ) => {
  return res.status( 404 ).json({ message: `Url ${req.originalUrl} not found.` });
}

const authentication = ( req, res, next ) => {
  try {
    const { name, password } = req.body;
    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status( 401 ).json({ message: "User doesn't exist!"});
    }

    if ( name.match(/^ *$/) || password.match(/^ *$/) )
    return res.status(404).json({ message: 'Username and Password are required, empty string refused.'});

    if (name == 'admin' && password =='1234') {
      next()

    } else {
      return res.status( 401 ).json({ message: "User NOT authorized"});
    }
  } catch( err) { next( err )}
}

const multer = require('multer');
const { storage, fileFilter } = require('../helpers/helper');

const uploadImage = (req, res, next) => {

  // 'image' is the key of file input in Postman
  const upload = multer({ storage, fileFilter }).single('image');
  
  try {
    upload(req, res, (err) => {

      if (req.fileFormatError) {
        return res.status(401).json({ errorMessage: 'Only image files are allowed!' });
      } 
      if (!req.file) {
        return res.status(404).json({ errorMessage: 'Please select an image to upload!' });
      } 
      if (err) {
        return res.status(500).json(err);
      }
      
      res.status(201).json({ uploadedFile: req.file.filename });
    });
  } catch (err) { next(err); }
};

module.exports = { noCacheMiddleware, authentication, notFoundRoute, uploadImage}