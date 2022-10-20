const User = require('../models/user');
const Room = require('../models/room');
const Message = require('../models/message');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async ( req, res ) => {
    const { name, password } = req.body;
    const findUser = await User.findOne( { name })
    if (findUser) 
        return res.status(400).json({ status: false, message: 'Name already used.'});

    if (password.length < 6) 
        return res.status(400).json({ status: false, message: 'Password must be at least 6 characters long.' });

    const user = new User({ 
        name,  
        password: await brcypt.hash(password, 10)
    });

    await user.save();
    
    const token = jwt.sign( { id: user._id }, 'process.env.SECRET' );

    res.status(200).json({ 
        status: true,
        message: `User created.`,
        user,
        token
    })
};

const login = async ( req, res ) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user ) 
        return res.status(404).json({ status: false, message: "User doesn't exist."});

    const comparePW = await brcypt.compare(password, user.password);

    if ( !comparePW ) 
        return res.status(400).json({ status: false, message: "Wrong password."});

    const token = jwt.sign( { id: user._id }, 'process.env.SECRET' );

    res.status(200).json({
        status: true,
        message: "User logged.",
        user,
        token
    }); 

};


const createRoom = async (req, res) => {
    const { name } = req.body;
    
    const findRoom = await Room.findOne({ name });
    if (findRoom) 
        return res.status(400).json({ status: false, message: `Room ${name} already exits.`});

    const room = new Room( {name} );
    await room.save();
    res.status(200).json({ status: true, message: `Room ${name} created.`, room: room});
};

const getAllRooms = async (req, res) => {
    const rooms = await Room.find({});   
    res.status(200).json(rooms);
};

const getOneRoom = async (req, res) => {
    const id = req.params.id;
    const findRoom = await Room.findById(id)
    if (!findRoom)
        return res.status(400).json({ status: false, message: `No Room with this ID.` }); 
    res.status(200).json({ room: findRoom});
}

const deleteRoom = async (req, res) => {    
    const deleteRooms = await Room.findByIdAndDelete(req.body.id);
    await Message.deleteMany({ where: { "room._id": req.body.id }});

    if (!deleteRooms) 
        return res.status(400).json({ status: false, message: `No Room with this ID.`});  
    res.status(200).json({ status: true, message: 'Room deleted.'});    
};

module.exports = { signup, login, createRoom, getAllRooms, getOneRoom, deleteRoom }