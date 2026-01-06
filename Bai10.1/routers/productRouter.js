const express = require('express');
const router = express.Router();

const { Product, Category, Tag } = require('../models');

const { Op } = require('sequelize');
const handleValidationErrors = require('../middlewares/validationErrorHandler');
const { commonIdParamValidation, createProductValidationRules, updateProductValidationRules } = require('../validators/productValidator');
const { getProductById, getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRole = require('../middlewares/authorizeRole');

router.get('/products', 
    getAllProducts
   );

router.get('/products/:id',
    commonIdParamValidation(),
    handleValidationErrors,
    getProductById
    )

router.post('/products',
    authenticateToken ,
    createProductValidationRules(),
    handleValidationErrors,
    createProduct
)

router.put('/products:id',
    updateProductValidationRules(),
    handleValidationErrors ,
    updateProduct
);

router.delete('/products/:id',
    authenticateToken ,
    authorizeRole('user') ,
    commonIdParamValidation() ,
    handleValidationErrors ,
    deleteProduct
)
module.exports = router;