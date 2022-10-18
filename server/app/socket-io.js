const User = require( './models/user' );
const Message = require( './models/message' );
require('./models/room');
const jwt = require('jsonwebtoken');

function socketio( io ){
    
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.query.token;
            const payload = await jwt.verify(token, 'process.env.SECRET');        
            socket.id = payload.id;
            // console.log(payload, socket.id)
            next();
        } catch (err) {
            console.log(err);
        }
    });

    io.on( 'connection', ( socket ) => {
        console.log( 'user connected on socket.id:', socket.id );

        socket.on('disconnect', () => {
            console.log("Disconnected:", socket.id);
        });
    
        socket.on('join', ({ room_id }) => {
            socket.join( room_id );
            console.log('A user join chat:', room_id);
        });
    
        socket.on('leave', ({ room_id }) => {
            socket.leave( room_id );
            console.log('A user leave chat:', room_id);
        });
    
        socket.on('chatMessage', async ({ room_id, message }) => {
            const user = await User.findOne({ _id: socket.id })
            const newMessage = new Message({ room_id, user_id: socket.id, message, user_name: user.name });
            io.to(room_id).emit('newMessage', { 
                message,
                user_name: user.name,
                user_id: socket.id,
            });
            await newMessage.save();
        });

        socket.on('get-message-history', async (room_id) => {
            const findMessages = await Message.find({ room_id })
            socket.emit('message-history', findMessages);
        });
    });
    }

    module.exports = { socketio }