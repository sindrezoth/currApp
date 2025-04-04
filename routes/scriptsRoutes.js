const express = require('express');
const router = express.Router();
const scriptsController = require('../controllers/scriptsController.js');
const verifyJWT = require('../middleware/verifyJWT.js');

router.route('/')
    .get(scriptsController.getAllScripts)
    .post(scriptsController.createNewScript)
    //.patch(clientController.updateClient)
    .delete(scriptsController.deleteScript);

module.exports = router;
