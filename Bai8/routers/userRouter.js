const express = require('express');
const { getAllUsers } = require('../controllers/userContrller');
const router = express.Router();


router.get('/',
    getAllUsers
)

module.exports = router