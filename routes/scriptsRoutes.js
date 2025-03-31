const express = require('express');
const router = express.Router();
const scriptsController = require('../controllers/scriptsController.js');
const verifyJWT = require('../middleware/verifyJWT.js');

router.route('/')
    //.get(clientController.getAllClients)
    .post(scriptsController.createNewScript)
    //.patch(clientController.updateClient)
    //.delete(clientController.deleteClient);

module.exports = router;
