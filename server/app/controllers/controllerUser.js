const User = require('../models/user');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async ( req, res ) => {
    const { name, password } = req.body;

    if ( name.match(/^ *$/) || password.match(/^ *$/) )
    return res.status(404).json({ 
        status: false,
        input: 'password', 
        message: 'Username and Password are required, empty string refused.',
    });

    if ( name.length > 15 ) 
    return res.status(404).json({ 
        status: false,
        input: 'name', 
        message: 'Username cannot be more than 16 characters.',
    });

    const findUser = await User.findOne( { name })
    if (findUser)
        return res.status(400).json({ 
            status: false, 
            input: 'name',
            message: 'Username already used.',
        });

    if (password.length < 6)
        return res.status(400).json({ 
            status: false, 
            input: 'password',
            message: 'Password must be at least 6 characters long.' ,
        });  
    
    const user = new User({ 
        name,  
        password: await brcypt.hash(password, 10)
    });

    await user.save();
    
    const token = jwt.sign( { id: user._id }, process.env.SECRET );

    res.status(200).json({ 
        status: true,
        message: `User created.`,
        user,
        token
    })
};

const login = async ( req, res ) => {
    const { name, password } = req.body;

    if ( name.match(/^ *$/) || password.match(/^ *$/) )
    return res.status(404).json({ 
        status: false,
        input: 'password', 
        message: 'Username and Password are required, empty string refused.',
    });
    
    if ( name.length > 15 ) 
    return res.status(404).json({ 
        status: false,
        input: 'name', 
        message: 'Username cannot be more than 16 characters.',
    });
    
    const user = await User.findOne({ name });
    if (!user )
    return res.status(404).json({ 
        status: false,
        input: 'name', 
        message: "Username doesn't exist.",
    });

    const comparePW = await brcypt.compare(password, user.password);
    if ( !comparePW )
        return res.status(400).json({ 
            status: false, 
            input: 'password',
            message: "Wrong password.",
        });

        
    const token = jwt.sign( { id: user._id }, process.env.SECRET );

    res.status(200).json({
        status: true,
        message: "User logged.",
        user,
        token
    }); 
    
};

module.exports = { signup, login }