const express = require('express') ;
const router = express.Router() ; 

const {authenticate }= require('../middleweare/authenMiddleweare') ;
const {login ,logout  ,getDashboardInfo} = require('../controller/userController') ;

router.post('/login' ,
    login
)
router.get('/logout' ,
    logout 
)
router.get ('/dashBoard' ,
    authenticate ,
    getDashboardInfo
) ;

module.exports = router