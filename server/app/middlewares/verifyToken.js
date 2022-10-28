const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // console.log('req:', req.headers.authorization, 'token', token)
        if (!token) 
            return res.status(401).json( {status: false, message: "Not authorized"} )

        const payload = jwt.verify( token, 'process.env.SECRET' ); 
        req.payload = payload;
        
        next();
    } catch (err) {
        res.status(403).json({ status: false, message: "Not authorized."})
    }
};

module.exports = { verifyJWT }