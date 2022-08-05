const mongoose = require( 'mongoose' );
const { MONGODB_URI } = require( '../config/config' );

const connectDB = async() => {
    try {
        await mongoose.connect( MONGODB_URI );
        console.log("Database works correctly");

    } catch( err ) { throw err; }
};

module.exports = { connectDB }