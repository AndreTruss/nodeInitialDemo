const jwt = require('jsonwebtoken');

const createJWT =  jwt.sign( { id: '1234' }, 'process.env.SECRET', { expiresIn: 60 * 60 });

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) 
            return res.status(401).json( { message: "Forbidden."} )
        const payload = await jwt.verify( token, process.env.SECRET );        
        req.payload = payload;
        next();
    } catch (err) {
        res.status(401).json({ message: "Forbidden."})
    }
};
let tok = createJWT
console.log(tok)
module.exports = { createJWT, verifyJWT }