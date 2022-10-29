const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, 
        required: true  
    },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
  },
},{
  versionKey: false
});

const Room = mongoose.model( 'room', roomSchema );

module.exports = Room;