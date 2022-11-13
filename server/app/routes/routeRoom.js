const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllerRoom');
const { verifyJWT } = require('../middlewares/verifyToken')

router.post('/room', verifyJWT, controllers.createRoom );
router.get('/room', verifyJWT, controllers.getAllRooms );
router.get('/room/:id', verifyJWT, controllers.getOneRoom );
router.delete('/room/:id', verifyJWT, controllers.deleteRoom );

module.exports = router;