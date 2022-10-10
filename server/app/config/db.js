const mongoose = require( 'mongoose' );
//const { MONGODB_URI } = require('./config')
const MONGODB_URI= 'mongodb://localhost:27017/chat-app'

const connectDB = async() => {
    try {
        await mongoose.connect( MONGODB_URI );
        console.log("Database works correctly");

    } catch( err ) { console.log("Database doesn't work"); }
};

module.exports = { connectDB }