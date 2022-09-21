const express = require('express');
const router = express.Router();
const { JWTController } = require('../controllers/JWT-controller');
const { loginAuthentication } = require('../middlewares/loginAuthentication');

router.post('/signup', loginAuthentication, JWTController );
router.post('/login', loginAuthentication, JWTController );
router.get('/logout', loginAuthentication, JWTController );

module.exports = router;