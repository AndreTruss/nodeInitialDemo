const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');
const { verifyJWT } = require('../middlewares/verifyToken')

router.post('/signup', controllers.signup );
router.post('/login', controllers.login );

router.post('/room', verifyJWT, controllers.createRoom );
router.get('/room', verifyJWT, controllers.getAllRooms );
router.get('/room/:id', verifyJWT, controllers.getOneRoom );
router.delete('/room', verifyJWT, controllers.deleteRoom );

module.exports = router;