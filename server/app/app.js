const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const routerLogin = require('./routes/route');
const { connectDB } = require('./config/db');
const { CORS_URL } = require('./config/config');

const app = express();
const httpServer = http.createServer( app );

app.use( cors( {
    origin: CORS_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  } ) );
app.use( express.json() );
//app.use(cookieParser());

// Routes
app.use( '/', routerLogin );

// DB initialization
connectDB();

// Socket-io
const io = new Server( httpServer, {
  cors: {
    origin: CORS_URL,
  },
});
// Call the function on './socket-io', and pass io as argument
require('./socket-io')(io);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});