const express = require('express');
const router = express.Router();

const { Product, Category, Tag } = require('../models');
const { Op } = require('sequelize');
const { body, param, validationResult } = require('express-validator');
const handleValidationError = require('../middelwares/validatitonErrorHandler');
const { commonIdParamValidation } = require('../validators/categoryValidator');
const { createProductValidationRules, updateProductValidationRules } = require('../validators/productValidator');

const category = require('../models/category');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');


router.get('/products',
    getAllProducts);

router.get('/products/:id',
    commonIdParamValidation(),
    handleValidationError,
    getProductById
)

router.post('/products',
    createProductValidationRules(),

    handleValidationError,
    createProduct
)

router.put('/products:id',
    updateProductValidationRules(),
    updateProduct
    );

router.delete('/products/:id',
    commonIdParamValidation(),
    deleteProduct
   )
module.exports = router;