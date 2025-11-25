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
const authenticationToken = require('../middelwares/authenticateToken');
const authorizeRole = require('../middelwares/authorizeRole');

// const authenticationToken = require('../middelwares/authenticateToken')
router.get('/',
    getAllProducts);

router.get('/:id',
    commonIdParamValidation(),
    handleValidationError,
    getProductById
)

router.post('/',
    authenticationToken,
    createProductValidationRules(),

    handleValidationError,
    createProduct
)

router.put('/:id',
    authenticationToken ,
    updateProductValidationRules(),
    updateProduct
    );

router.delete('/:id',
    authenticationToken ,
    authorizeRole('user'),
    commonIdParamValidation(),
    deleteProduct
   )
module.exports = router;