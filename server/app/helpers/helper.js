const jwt = require('jsonwebtoken');

const createJWT = ( id ) => { jwt.sign( { id }, process.env.SECRET, { expiresIn: 60 * 60 })};

modeule.exports = { createJWT }