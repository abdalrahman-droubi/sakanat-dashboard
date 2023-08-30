const express = require('express');
const router = express.Router();
const providerControllers = require('../controllers/ServicesRequestController')


router.get('/getRequestServices/:status/:id', providerControllers.getRequestServices)
router.put('/updateRequestStatus/:type/:id', providerControllers.updateRequestStatus)
router.get('/getAllRequest', providerControllers.getAllRequest)


module.exports = router;