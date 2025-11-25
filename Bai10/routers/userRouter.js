const express = require('express');
const { getAllUsers, updateMyAvatar } = require('../controllers/userContrller');
const router = express.Router();
const authenticationToken = require('../middelwares/authenticateToken');
const authorizeRole = require('../middelwares/authorizeRole');
const { uploadSingleImage } = require('../middelwares/uploadMiddelwares');
const { resizeImage } = require('../middelwares/imageProcessingMiddelwares');

router.get('/',
    getAllUsers
)
router.patch('/update-my-avatar' ,
    authenticationToken ,
    uploadSingleImage('avatar') ,
    resizeImage,
    updateMyAvatar
)

module.exports = router