const express = require('express')
const router = express.Router()
const admAuthController = require('../controllers/admAuthController')
const loginLimiter = require('../middleware/loginLimiter')

router.route('/')
    .post(loginLimiter, admAuthController.login)

router.route('/refresh')
    .get(admAuthController.refresh)

router.route('/logout')
    .post(admAuthController.logout)

module.exports = router
