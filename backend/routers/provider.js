const express = require('express');
const router = express.Router();
const providerControllers = require('../controllers/providerController')

router.post('/addProvider',providerControllers.addProvider)
router.get('/getProvider/:status', providerControllers.getProvider);
module.exports = router;