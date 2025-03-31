const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientsController.js');

router.route('/test')
    .patch((req, res) => {console.log(req.body);res.json(message:'TEST');});

router.route('/newTrader')
    .patch(clientController.updateClientNewTrader);

router.route('/')
    .get(clientController.getAllClients)
    .post(clientController.createNewClient)
    .patch(clientController.updateClient)
    .delete(clientController.deleteClient);


module.exports = router;
