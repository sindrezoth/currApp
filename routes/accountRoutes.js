const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController.js');
const verifyJWT = require('../middleware/verifyJWT.js');

router.use(verifyJWT);

router.route('/')
    .get(accountController.accountDetails)
    .patch(accountController.updateAccount)
    .delete(accountController.deleteAccount);

module.exports = router;
