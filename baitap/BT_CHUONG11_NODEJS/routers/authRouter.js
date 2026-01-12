const express = require('express') ;
const router = express.Router() ;

const authenticate = require('../middlewares/authMiddleware.js') ;

const {login ,logout , getDashboardInfo, register} = require('../controllers/authController.js') ;
router.post('/register' , register)
router.post('/login' ,login) ;
router.get('/logout' , logout) ;
router.get('/dashboard' , authenticate , getDashboardInfo) ;

module.exports = router ;
