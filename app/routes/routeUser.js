const express = require('express');
const routerUser = express.Router();

const getUser = ( req, res ) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 
  res.status( 201 ).json({ name: 'Andrea', age: '46', url: fullUrl })
}

routerUser.get('/user', getUser )

module.exports = routerUser