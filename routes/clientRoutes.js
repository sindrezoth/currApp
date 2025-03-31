const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientsController.js');
const verifyJWT = require('../middleware/verifyJWT.js');

router.route('/newTrader')
    .patch(clientController.updateClientNewTrader);

router.route('/')
    .get(clientController.getAllClients)
    .post(clientController.createNewClient)
    .patch(clientController.updateClient)
    .delete(clientController.deleteClient);

module.exports = router;
