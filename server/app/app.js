const express = require('express');
const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
const router = require('./routes/route');
const { connectDB } = require('./config/db');
const  CORS_URL  = 'http://localhost:3000';
const { socketio} = require('./socket-io')

const app = express();
// const httpServer = http.createServer( app );
const httpServer = require('http').Server( app )

app.use( cors( {
    origin: CORS_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  } ) );
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) )

// Routes
app.use( '/', router );

// DB initialization
connectDB();


// Socket-io
// const io = new Server( httpServer, {
const io = require('socket.io')( httpServer, {
  cors: {
    origin: CORS_URL,
  },
});

socketio( io );

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});