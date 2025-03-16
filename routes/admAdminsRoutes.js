const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientsController.js');
const verifyAdminJWT = require('../middleware/verifyAdminJWT.js');

//router.use(verifyAdminJWT);

router.route('/')
    .get(clientController.getAllClients)
    .post(clientController.createNewClient)
    .patch(clientController.updateClient)
    .delete(clientController.deleteClient);

module.exports = router;
