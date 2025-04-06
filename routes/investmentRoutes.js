const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentController.js');
const verifyJWT = require('../middleware/verifyJWT.js');

router.route('/')
    .get(investmentController.getAllInvestments);

module.exports = router;

