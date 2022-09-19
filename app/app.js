const express = require('express');
const cors = require('cors')

const routerUser = require('./routes/routeUser');
const routerUpload = require('./routes/routeUpload');
const routerTime = require('./routes/routerTime');
const routerPokemon = require('./routes/routerPokemon');
const { noCacheMiddleware } = require('./middlewares/middleware');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('img'))

app.use( noCacheMiddleware );
app.use('/', routerUser );
app.use('/', routerUpload );
app.use('/', routerTime );
app.use('/', routerPokemon);

app.listen( port, () => {
    console.log(`CORS-enabled web server listening on port ${port}`);
    })