const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.js');
const loginLimiter = require('../middleware/loginLimiter.js');

router.route('/')
  .post(loginLimiter, registerController.register);

module.exports = router;
