const Room = require( './models/room' );
const Message = require( './models/message' );
const users = [];

const socketio = ( io ) => {
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.query.token;
            const payload = await jwt.verify(token, process.env.SECRET);        
            socket.id  = payload.id;
            next();
        } catch (err) {
            console.log(err);
        }
    });

    io.on( 'connection', ( socket ) => {
        console.log( 'user connected on socket.id:', socket.id );

        const rooms = Room.find();
        socket.emit( 'rooms-found', rooms );
        
        socket.on( 'create-room', ( name ) => {
            const room = new Room({ name });
            room.save();
            io.emit( 'room-created', room );
        });

        socket.on( 'join', ({ name, room_id, user_id }) => {
            const findUser = users.find( (user) => user.room_id === room_id && user.user_id === user_id );
            if ( findUser ){ return 'User is already in the room' };

            const newUser = { socket_id: socket.id, name, user_id, room_id };
            users.push( newUser );

            socket.join( room_id );
        });

        socket.on( 'send-message', ( message, room_id ) => {
            const getUser = users.find( (user) => user.socket_id === socket.id );

            const newMessage = new Message( getUser.name, getUser.user_id, room_id, message );
            newMessage.save();

            io.to( room_id ).emit( 'new-message', newMessage );
        });

        socket.on( 'message-history', ( room_id ) => {
            const messages = Message.find({ room_id });
            socket.emit( 'history', messages );
        });

        socket.on( 'disconnect', () => {
            const index = users.findIndex( (user) => user.socket_id === socket.id );
            users.splice( index, 1 );
        });
    });
    }

    module.exports = { socketio }