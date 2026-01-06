const { body , param } = require('express-validator')

const commonIdParamValidation = () => {
    return [
        param('id')
            .isInt({ min: 1 }).withMessage('id danh muc la so nguyen duong ')
    ]
}
const createCategoryValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('khong duco bo trong')
            .isLength({ min: 3, max: 255 }).withMessage("ten danh muc phai tu 3 den 255 ky tu ")
            .trim(),
        body('description')
            .optional()
            .isLength({ max: 500 }).withMessage('......')
            .trim()
    ]
}

const updateCategoryValidationRules = () => {
    return [
        body('name').optional()
            .isLength({ min: 3, max: 255 }).withMessage("ten danh muc phai tu 3 den 255 ky tu ")
            .trim(),
        body('description')
            .optional()
            .isLength({ max: 500 }).withMessage('......')
            .trim()
    ]
}

module.exports = {
    createCategoryValidationRules,
    updateCategoryValidationRules,
    commonIdParamValidation
}