const express = require('express');
const router = express.Router();
const providerControllers = require('../controllers/providerController')

router.post('/addProvider',providerControllers.addProvider)
router.get('/getProvider/:status', providerControllers.getProvider);
router.put('/RetrieveProvider/:id', providerControllers.RetrieveProvider)
router.put('/deleteProvider/:id', providerControllers.deleteProvider)
module.exports = router;