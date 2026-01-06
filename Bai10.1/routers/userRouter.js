const express = require('express');
const { getAllUsers, updateMyAvatar } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');
const { uploadSingleImage } = require('../middlewares/uploadMiddleware');
const { resizeImage } = require('../middlewares/imageProcessingMiddleware');
const router = express.Router();


router.get('/',
    getAllUsers
)

router.patch('/updateMyAvatar' ,
    // authenticateToken
    authenticateToken ,
    uploadSingleImage('avatar'),
    resizeImage,
    updateMyAvatar 
)
module.exports = router