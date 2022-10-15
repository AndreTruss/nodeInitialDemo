const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, 
        required: [ true, 'Please enter a name'] 
    },
  password: { type: String, 
            required: [ true, 'Please enter a password'],
            minlength: [ 6, 'Password shold be at least 6 characters long'],
  },
}, { versionKey: false});

userSchema.pre( 'save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.userLogin = async function( name, password ) {
  const user = await this.findOne({ name });
  if( user ){
    const comparePW = await bcrypt.compare( password, user.password );
    if( comparePW ){
      return user
    }
    throw Error('Wrong password')
  }
  throw Error("User doesn't exist")
}

const User = mongoose.model( 'user', userSchema );

module.exports = User;