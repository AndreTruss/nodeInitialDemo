const express = require('express');
const router = express.Router();
const loginController = require('../controllers/controller');

router.post('/signup', loginController.signup );
router.post('/login', loginController.login );
router.get('/logout', loginController.logout );

module.exports = router;