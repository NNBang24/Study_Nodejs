const { body ,param } = require('express-validator');


const commonIdParamValidation = () => {
    return [
        param('id')
            .isInt({ min: 1 }).withMessage('id danh muc la so nguyen duong '),
    ]
}
const createCategoryValidationRules = () => {
    return [
        body('name')
            .notEmpty().withMessage('Ten khong duoc de trong')
            .isLength({ min: 3, max: 255 }).withMessage('ten danh muc phai tu 3 den 255 ky tu')
            .trim(),
        body('description')
            .optional()
            .isLength({ max: 500 }).withMessage('mo ta khong qua 500 ky tu')
            .trim(),
    ]
}
const updateCategoryValidatuinRules = () => {
    return [
        body('name')
            .optional()
            .notEmpty().withMessage('Ten khong duoc de trong')
            .isLength({ min: 3, max: 255 }).withMessage('ten danh muc phai tu 3 den 255 ky tu')
            .trim(),
        body('description')
            .optional()
            .isLength({ max: 500 }).withMessage('mo ta khong qua 500 ky tu')
            .trim(),
    ]
}

module.exports = {
    commonIdParamValidation ,
    createCategoryValidationRules,
    updateCategoryValidatuinRules
}