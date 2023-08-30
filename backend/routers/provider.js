const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadsImages'); 
const providerControllers = require('../controllers/providerController')

router.post('/addProvider',upload.array('companyImage', 5),providerControllers.addProvider)
router.get('/getProvider/:status', providerControllers.getProvider);
router.put('/RetrieveProvider/:id', providerControllers.RetrieveProvider)
router.put('/deleteProvider/:id', providerControllers.deleteProvider)
router.get('/getOneProvider/:id', providerControllers.getOneProvider)
router.put('/updateProviderAccount/:id', providerControllers.updateProviderAccount)
router.put('/updateProviderinfoData/:id', providerControllers.updateProviderinfoData)
router.put('/updateServicesData/:id', providerControllers.updateServicesData)
router.put('/updateSchedule/:id', providerControllers.updateSchedule)

module.exports = router;