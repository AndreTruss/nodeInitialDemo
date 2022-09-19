const express = require('express');
const moment = require('moment');
const routerTime = express.Router();
const { authentication } = require('../middlewares/middleware');

const userTime = function (req, res) {
  const user = req.body.name;
  moment.locale('es')
  const date = moment().format('LLLL');
  res.json({ user, date });
}

routerTime.post('/time', authentication, userTime);

module.exports = routerTime