const jwt = require('jsonwebtoken');

const createJWT = ( id ) => { jwt.sign( { id }, 'process.env.SECRET', { expiresIn: 60 * 60 })};

const setCookie = ( token, res ) => {
    res.cookie( 'jwt', token, { httpOnly: true, maxAge: 1500000, secure: true, samesite: 'none' });
}

module.exports = { createJWT, setCookie }