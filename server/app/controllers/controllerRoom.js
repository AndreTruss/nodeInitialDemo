const Room = require('../models/room');
const Message = require('../models/message');

// Create new chat room
const createRoom = async (req, res) => {
    const { name, user_id } = req.body;
    
    if ( name.match(/^ *$/) ) 
        return res.status(404).json({ 
            status: false, 
            message: `Name required, not empty string`,
        });

    if ( name.length > 15 ) 
    return res.status(404).json({ 
        status: false,
        message: 'Room name cannot be more than 16 characters.',
    });
    
    const findRoom = await Room.findOne({ name });
    if (findRoom)
        return res.status(400).json({ 
            status: false, 
            message: `Room ${name.toUpperCase()} already exits.`,
        });

    const room = new Room({ name, user_id });
    await room.save();
    res.status(200).json({ 
        status: true, 
        message: `Room ${name.toUpperCase()} created.`, 
        room: room,
    });
    
};

// get all chat rooms name
const getAllRooms = async (req, res) => {
    const rooms = await Room.find({});   
    res.status(200).json(rooms);
};

// get only one chat rooms name
const getOneRoom = async (req, res) => {
    const id = req.params.id;
    const findRoom = await Room.findById(id);

    (!findRoom)
    ? res.status(400).json({ status: false, message: `No Room with this ID.` }) 
    : res.status(200).json({ status: true, room: findRoom})
}

// delete one chat room and messages
const deleteRoom = async (req, res) => {    
    const deleteRooms = await Room.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ "room_id": req.params.id });

    (!deleteRooms) 
    ? res.status(400).json({ status: false, message: `No Room with this ID.`})
    : res.status(200).json({ status: true, message: 'Room deleted.'})    
};

module.exports = { createRoom, getAllRooms, getOneRoom, deleteRoom }