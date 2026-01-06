const express = require('express');
const { createEvent, getEvents } = require('../controller/eventController');
const { upLoadSingleImage } = require('../middleware/evenUploadMiddleware');
const {authenticateToken} = require('../middleware/authMiddleware')
const { resizeImage } = require('../middleware/eventImageProcessingMiddleware');

const router = express.Router();

router.get(
    '/events',
    authenticateToken, 
    getEvents
);

router.post('/createMyAvatar',
    authenticateToken ,
    upLoadSingleImage('avatar'),
    resizeImage,
    createEvent
)

module.exports = router;