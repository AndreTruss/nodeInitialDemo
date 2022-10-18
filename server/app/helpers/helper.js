const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        //console.log(req.headers.authorization, token)
        if (!token) 
            return res.status(401).json( { message: "Not authorized"} )
        const payload = await jwt.verify( token, 'process.env.SECRET' ); 
        // console.log(payload)       
        req.payload = payload;
        next();
    } catch (err) {
        res.status(403).json({ message: "Not authorized."})
    }
};

module.exports = { verifyJWT }