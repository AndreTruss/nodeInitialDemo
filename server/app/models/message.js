const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,  
    },
    message: { 
        type: String, 
        required: true,  
    },
    room_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,  
    }, 
}, { versionKey: false },{ timestamps: true });

const Message = mongoose.model( 'message', messageSchema );

module.exports = Message;