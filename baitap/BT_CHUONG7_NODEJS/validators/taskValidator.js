const { body, param, query } = require('express-validator');

const createTaskValidationRules = () => {
    return [
        body('title')
            .notEmpty().withMessage('khong duoc bo trong')
            .isLength({ min: 2, max: 255 }).withMessage('tile la chuoi phai tu 2 - 255 ky tu')
            .trim(),
        body('description')
            .optional()
            .isString()
            .trim(),
        body('isCompleted')
            .optional()
            .isBoolean()
            .withMessage('isCompleted phai la boolean'),
        body('dueDate')
            .optional()
            .isISO8601()
            .withMessage('dueDate phai dung dinh dang ngay (YYYY-MM-DD)')

    ]
};

const updateBookValidationRules = () => {
    return [
        param('id')
            .isInt({ min: 1 })
            .withMessage('id phai la so nguyen duong'),
        body('title')
            .optional()
            .isLength({ min: 3, max: 255 })
            .withMessage('title phai tu 3 den 255 ky tu'),

        body('description')
            .optional()
            .isString()
            .withMessage('description phai la chuoi'),

        body('isCompleted')
            .optional()
            .isBoolean()
            .withMessage('isCompleted phai la true hoac false'),
        body('dueDate')
            .optional()
            .isISO8601()
            .withMessage('dueDate phai dung dinh dang YYYY-MM-DD'),
    ]
}

const commonIdParamValidation = () => {
    return [
        param('id')
            .isInt({ min: 1 }).withMessage('id danh muc la so nguyen duong '),
    ]
}
module.exports = {
    createTaskValidationRules,
    updateBookValidationRules,
    commonIdParamValidation
}