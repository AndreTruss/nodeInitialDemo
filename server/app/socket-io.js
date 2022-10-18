const Room = require( './models/room' );
const Message = require( './models/message' );
const { addUser, getUser, removeUser } = require('./helpers/socket_helper');
const users = []

const socketio = ( io ) => {
    io.on( 'connection', async ( socket ) => {
        console.log( 'user connected on socket.id:', socket.id );
        
        const rooms = await Room.find({})
        socket.emit( 'rooms-found', rooms );
        
        socket.on( 'create-room', async( name ) => {
            const room = new Room({ name });
            await room.save()
            io.emit( 'room-created', room );
        });

        socket.on( 'join', async( name, room_id, user_id ) => {
            // const findUser = users.find((user) => user.room_id === room_id && user.user_id === user_id);
            // if (findUser) { return { error: 'User already exists in this room' }; }

            const newuser = { socket_id: socket.id, name, room_id, user_id };
            // users.push( newuser )
            socket.join( room_id );
            console.log( 'user joined:', newuser )
            return
        });

        socket.on( 'send-message', async ( name, user_id, message, room_id, setMessage ) => {
            // const finduser = await users.find( (user) => user.user_id == user_id )
            const newMessage = new Message({ name, user_id, text: message, room_id });
            await newMessage.save();
// console.log(newMessage)
            io.to( room_id ).emit( 'new-message', newMessage );
            setMessage()
        });

        socket.on( 'message-history', async ( room_id ) => {
            const messages = await Message.find({ room_id })
            socket.emit( 'history', messages );
        });

        socket.on( 'leave', async( room_id, user_id) => {
            // const index = await users.findIndex((user) => user.user_id === user_id);
            // if (index !== -1) {
                socket.leave( room_id )
                console.log('User leave chat-room')
                // return users.splice(index, 1);
            // }
        });
        
        socket.on( 'disconnect', () => {
            console.log('User disconnected')
        });
    });
}

module.exports = { socketio }