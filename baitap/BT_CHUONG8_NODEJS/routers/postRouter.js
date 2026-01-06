const express = require('express') ;
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/PostController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRole = require('../middlewares/authorizeRole');
const isAuthorOrAdmin = require('../middlewares/isAuthorOrAdmin');

const router = express.Router() ;


router.get('/',
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
    updatePost
)
router.delete('/:id',
    authenticateToken,
    isAuthorOrAdmin,
    deletePost
)

module.exports = router