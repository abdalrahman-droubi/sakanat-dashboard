const express = require('express')
const router = express.Router()
const {handleNewUser} = require('../controllers/registerController.js')

router.post('/register',handleNewUser);

module.exports = router