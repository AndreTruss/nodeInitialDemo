const Room = require( './models/room' );
const Message = require( './models/message' );
const { addUser, getUser, removeUser } = require('./helpers/socket_helper');


const socketio = ( io ) => {
    io.on( 'connection', ( socket ) => {
        console.log( 'user connected on socket.id:', socket.id );

        Room.find({}).then((result) => {
        socket.emit( 'rooms-found', result )});
        
        socket.on( 'create-room', ( name ) => {
            const room = new Room({ name });
            room.save().then((result) => {
            io.emit( 'room-created', result )});
        });

        socket.on( 'join', ({ name, room_id, user_id }) => {
            const { error, newuser } = addUser(socket.id, name, room_id, user_id);
            socket.join( room_id );
            if (error) { 
                console.log( 'error:', error )
                } else { 
                console.log( 'user joined:', newuser )
            }
        });

        socket.on( 'send-message', ( message, room_id, setMessage ) => {
            const finduser = getUser( socket.id );
console.log( finduser, message)
            const newMessage = new Message({ name: finduser.name, user_id: finduser.user_id, room_id, text: message });
            newMessage.save();

            io.to( room_id ).emit( 'new-message', newMessage );
            setMessage()
        });

        socket.on( 'message-history', ( room_id ) => {
            Message.find({ room_id }).then((result) => {
            socket.emit( 'history', result )});
        });

        socket.on( 'disconnect', () => {
            removeUser( socket.id );
        });
    });
    }

    module.exports = { socketio }