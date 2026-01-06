const express = require('express');
const router = express.Router();
const { Category, Product } = require('../models');
const { body, validationResult } = require('express-validator')
const e = require('express');
const handleValidationErrors = require('../middlewares/validationErrorHandler');
const { commonIdParamValidation, createCategoryValidationRules, updateCategoryValidationRules } = require('../validators/categoryValidator');
const { getAllCategories, getCategoryById, updateCategory, createCategory, deleteCategory } = require('../controllers/categoryControllers');

// Lay tat ca danh muc 
router.get('/',
    getAllCategories
)

// lay danh muc theo id 
router.get('/:id',
    commonIdParamValidation(),
    handleValidationErrors ,
    getCategoryById
)
// them danh mu 
router.post('/',
    createCategoryValidationRules(),
    handleValidationErrors,
    createCategory
   )

// sua  danh muc
router.patch('/:id',
    updateCategoryValidationRules(),
    handleValidationErrors ,
    updateCategory
)

router.delete('/:id',
    commonIdParamValidation(),
    handleValidationErrors ,
    deleteCategory    
)
module.exports = router;

//Eager loading

//Lazy loading