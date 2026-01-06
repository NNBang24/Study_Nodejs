const express = require('express') ;
const router = express.Router() ;
const handleValidationErrors = require('../middlewares/validationErrorHandler')
const {registerValidationRules, loginValidationRules } = require('../validators/authValidator') ;
const { register, login  ,getMe} = require('../controllers/authControllers');
const authenticateToken = require('../middlewares/authenticateToken');


router.post('/register' ,
    registerValidationRules() ,
    handleValidationErrors ,
    register
)

router.post('/login' ,
    loginValidationRules(),
    handleValidationErrors,
    login
)
router.get('/getMe',
    authenticateToken,
   
    getMe
)
module.exports = router ;