const User = require('../models/user');
const Room = require('../models/room');
const Message = require('../models/message');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async ( req, res ) => {
    const { name, password } = req.body;
    const findUser = await User.findOne( { name })
    if (findUser) 
        return res.status(400).json({ message: 'Name already used.'});

    if (password.length < 6) 
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });

    const user = new User({ 
        name,  
        password: await brcypt.hash(password, 10)
    });

    await user.save();

    res.status(200).json({ 
        message: `User created.`,
        user
    })
};

const login = async ( req, res ) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user ) 
        return res.status(404).json({ message: "User doesn't exist."});
    const comparePW = await brcypt.compare(password, user.password);

    if ( !comparePW ) 
        return res.status(400).json({ message: "Wrong password."});

    const token = jwt.sign( { id: user._id }, 'process.env.SECRET', { expiresIn: 60 * 60 });

    res.status(200).json({
        message: "User logged.",
        token
    }); 

};


const createRoom = async (req, res) => {
    const { name } = req.body;
    
    const findRoom = await Room.findOne({ name });
    if (findRoom) 
        return res.status(400).json({ message: `Room ${name} already exits.`});

    const room = new Room( name );
    await room.save();
    res.status(200).json({ message: `Room ${name} created.`, room: room});
};

const getAllRooms = async (req, res) => {
    const rooms = await Room.find({});   
    res.status(200).json(rooms);
};

const getOneRoom = async (req, res) => {
    const id = req.params.id;
    const getRoom = await Room.findById(id)
    if (!getRoom)
        return res.status(400).json({ message: `No Room with this ID.` }); 
    res.status(200).json({ room: getRoom});
}

const deleteRoom = async (req, res) => {    
    const deleteRooms = await Room.findByIdAndDelete(req.body.id);
    await Message.deleteMany({ where: { "room._id": req.body.id }});

    if (!deleteRooms) 
        return res.status(400).json({ message: `No Room with this ID.`});  
    res.status(200).json({ message: 'Room deleted.'});    
};

module.exports = { signup, login, createRoom, getAllRooms, getOneRoom, deleteRoom }