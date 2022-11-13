const User = require( './models/user' );
const Message = require( './models/message' );
const jwt = require('jsonwebtoken');
let users = [];

function socketio( io ){
    
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            const payload = jwt.verify(token, process.env.SECRET);        
            socket.id = payload.id;
            next();
        } catch (err) {
            console.log(err);
        }
    });

    io.on( 'connection', async ( socket ) => {
        console.log( 'User connected' );
        
        socket.on('disconnect', () => {
            users = [];
            console.log("User disconnected");
        });
    
        socket.on('join', async ({ room_id }) => {
            await socket.join( room_id );

            const user = await User.findOne({ _id: socket.id })
            users.push( ` ${user.name.toUpperCase()} ` )
            await io.in(room_id).emit('userOnChat', users )
            
            const joinMsg = `JOINS TO CHATROOM`
            const joinMessage = new Message({ room_id, user_id: socket.id, message: joinMsg, user_name: user.name.toUpperCase() });
            await io.in(room_id).emit('newMessage', joinMsg);
            await joinMessage.save();
        });
        
        socket.on('leave', async ({ room_id }) => {
            const user = await User.findOne({ _id: socket.id })
            const index = users.findIndex( (el) => el == ` ${user.name.toUpperCase()} `)
            users.splice( index, 1 ),[0];
            await io.in(room_id).emit('userOffChat', users )

            const leaveMsg = `LEAVES CHATROOM`
            const leaveMessage = new Message({ room_id, user_id: socket.id, message: leaveMsg, user_name: user.name.toUpperCase() });
            await io.in(room_id).emit('newMessage', leaveMsg);
            await leaveMessage.save();

            await socket.leave( room_id );
        });
    
        socket.on('chatMessage', async ({ room_id, message }) => {
            const user = await User.findOne({ _id: socket.id })
            const newMessage = new Message({ room_id, user_id: socket.id, message, user_name: user.name.toUpperCase() });
            await io.to(room_id).emit('newMessage', { message });
            await newMessage.save();
        });

        socket.on('get-message-history', async (room_id) => {
            const findMessages = await Message.find({ room_id })
            await socket.emit('message-history', findMessages);
        });

        // sockets for Home_with_socket.js variant

        /* await Room.find().then((result) => {
            io.emit('get-rooms', result);
          });
      
        socket.on('create-room', (name) => {
            const room = new Room({ name });
            room.save().then((result) => { io.emit('room-created', result); });
        });

        socket.on('delete-room', async ( room_id ) => {
            await Room.findByIdAndDelete(room_id);
            await Message.deleteMany({ "room_id": room_id });
        }) */
    });
    }

    module.exports = { socketio }