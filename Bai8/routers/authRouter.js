const express = require('express');
const router = express.Router() ;
const { registerValidationRules,loginValidationRules } = require('../validators/authValidator');
const handleValidationError = require('../middelwares/validatitonErrorHandler');
const { register ,login, getMe} = require('../controllers/authController');
const authenticationToken = require('../middelwares/authenticateToken');



router.post('/register' ,
    registerValidationRules(),
    handleValidationError,
    register
);

router.post('/login' ,
    loginValidationRules(),
    handleValidationError,
    login
);

router.get('/me' ,
    authenticationToken,
    getMe
    
);


module.exports = router ;
