const express = require('express');
const router = express.Router();
const handleValidationError = require('../middelwares/validatitonErrorHandler');
const { commonIdParamValidation, createCategoryValidationRules, updateCategoryValidatuinRules } = require('../validators/categoryValidator');
const { getAllCategories, getCategoryById, updateCategory, createCategory, deleteCategory } = require('../controllers/categoryController');

// Lay tat ca danh muc 
router.get('/',
    getAllCategories
)

// lay danh muc theo id 
router.get('/:id',
    commonIdParamValidation(),
    getCategoryById

)
// them danh mu 
router.post('/',
    createCategoryValidationRules(),
    handleValidationError,
    createCategory

)

// sua  danh muc
router.patch('/:id',
    updateCategoryValidatuinRules(),
    updateCategory
)

router.delete('/:id',
    commonIdParamValidation(),
    deleteCategory
)
module.exports = router;

//Eager loading

//Lazy loading