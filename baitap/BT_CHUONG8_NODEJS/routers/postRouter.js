const express = require('express') ;
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/PostController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRole = require('../middlewares/authorizeRole');
const isAuthorOrAdmin = require('../middlewares/isAuthorOrAdmin');
const { listPostValidationRules, postIdParamValidation } = require('../validator/postValidator');
const handleValidationErrors = require('../middlewares/validationErrorHandler');

const router = express.Router() ;


router.get('/',
    listPostValidationRules(),
    handleValidationErrors,
    getAllPosts ,
);

router.get('/:id',
    getPostById ,
);

router.post('/' ,
    authenticateToken ,
    authorizeRole(['admin', 'user']) ,
    createPost

);

router.put('/:id' ,
    authenticateToken,
    isAuthorOrAdmin ,
    postIdParamValidation() ,
    handleValidationErrors ,
    updatePost
)
router.delete('/:id',
    authenticateToken,
    isAuthorOrAdmin,
    postIdParamValidation() ,
    handleValidationErrors ,
    deletePost
)

module.exports = router