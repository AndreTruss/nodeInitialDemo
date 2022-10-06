const User = require('../models/user');
const { createJWT } = require('../helpers/helper');

const signup = async ( req, res ) => {
    const { name, password } = req.body;
    try {
        const user = await User.create({ name, password });
        //const token = createJWT( user._id );
        //res.cookie( 'jwt', token, { httpOnly: true, maxAge: 1500000, secure: true, samesite: 'none' });
        res.status( 201 ).json({ user })
    } catch( error ) {
        res.status( 400 ).json({ error })
    }
}

const login = async ( req, res ) => {
    const { name, password } = req.body;
    try {
        const user = await User.userLogin({ name, password });
        const token = createJWT( user._id );
        //res.cookie( 'jwt', token, { httpOnly: true, maxAge: 900000, secure: true, samesite: 'none' });
        res.status( 201 ).json({ user, token })
    } catch( error ) {
        res.status( 400 ).json({ error })
    }
}

const logout = ( req, res ) => {
    res.cookie( 'jwt', '', { maxAge: -1 });
    res.status( 200 ).json({ logout: true })
}

module.exports = { signup, login, logout }