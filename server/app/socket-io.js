const User = require( './models/user' );
const Message = require( './models/message' );
require('./models/room');
const jwt = require('jsonwebtoken');
let users = [];

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

    io.on( 'connection', async ( socket ) => {
        console.log( 'user connected on socket.id:', socket.id );
        
        socket.on('disconnect', () => {
            users = [];
            console.log("Disconnected:", socket.id);
        });
    
        socket.on('join', async ({ room_id }) => {
            await socket.join( room_id );
            const user = await User.findOne({ _id: socket.id })
            users.push( ` ${user.name.toUpperCase()} ` )
            await io.in(room_id).emit('userOnChat', users )
            console.log(user.name, 'join chat:', room_id);
            console.log(users)
        });
        
        socket.on('leave', async ({ room_id }) => {
            const user = await User.findOne({ _id: socket.id })
            // console.log(socket.id, user.name, users)
            const index = users.findIndex( (el) => el == ` ${user.name.toUpperCase()} `)
            // console.log(index)
            users.splice( index, 1 ),[0];
            await io.in(room_id).emit('userOffChat', users )
            console.log(user.name, 'leave chat:', room_id);
            console.log(users)

            await socket.leave( room_id );
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