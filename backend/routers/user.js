const express = require('express')
const router = express.Router()
const {getUser, updateUser,deleteUser,RetrieveUser} = require('../controllers/userController');
const verifyUser = require('../middleware/verifyUser');

/// ALL About Users
router.get('/getUser/:status', getUser);
router.put('/updateUser/:id', updateUser)
router.put('/RetrieveUser/:id', RetrieveUser)
router.put('/deleteUser/:id', deleteUser)

module.exports = router