const express = require('express') ;
const { register, login , getMe } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');
const { registerValidationRules, loginValidationRules } = require('../validator/authValidator');
const handleValidationErrors = require('../middlewares/validationErrorHandler');
const router = express.Router() ;


router.post('/register' ,
    registerValidationRules() ,
    handleValidationErrors ,
    register
)
router.post('/login' ,
    loginValidationRules(),
    handleValidationErrors ,
    login
)
router.get ('/getMe' ,
    authenticateToken ,
    getMe
)
module.exports =router