const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, 
        required: [ true, 'Please enter a name'] 
    },
  password: { type: String, 
            required: [ true, 'Please enter a password'],
            minlength: [ 6, 'Password shold be at least 6 characters long'],
  },
},{
  versionKey: false
});

const User = mongoose.model( 'user', userSchema );

module.exports = User;