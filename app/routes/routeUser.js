const express = require('express');
const routerUser = express.Router();

routerUser.get('/user', function(req,res){
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 
  res.json({ name: 'Andrea', age: '46', url: fullUrl })
})

module.exports = routerUser