const express = require('express') ;
const { getAllUsers, changeRole } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');
const { authorizeAdmin } = require('../middlewares/authorizeAdmin');
const router = express.Router() ;


router.get('/' ,
    authenticateToken ,
    authorizeAdmin,
    getAllUsers
) ;

router.patch('/:id/role' ,
    authenticateToken ,
    authorizeAdmin ,
    changeRole 
)

module.exports = router