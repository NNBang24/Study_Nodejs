const { body, param, query } = require('express-validator');

const listPostValidationRules = () => {
    return [
        query('title')
            .optional()
            .isString().withMessage('title phai la chuoi')
            .isLength({ max: 255 }).withMessage('title qua dai')
            .trim() ,
        query('content')
            .optional()
            .trim()
    ]
}
const bookIdParamValidation = () => {
    return [
        param('id')
            .notEmpty()
            .exists().withMessage('id la bat buoc')
            .toInt()
            .isInt({ min: 1 }).withMessage('id phai la so nguyen duong')
    ]
}