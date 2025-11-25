const { body, param } = require('express-validator');

const registerValidationRules = () => {
    return [
        body('username')
            .notEmpty().withMessage('username khong duoc de trong')
            .isLength({ min: 3, max: 30 }).withMessage('username phai tu 3 - 30 ki tu')
            .trim(),
        body('email')
            .notEmpty().withMessage('email khong duoc de trong')
            .isEmail().withMessage('email khong hop le')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('password khong duoc de trong')
            .isLength({ min: 6 }).withMessage('password phai it nhat 6 ky tu')
    ]

}

const loginValidationRules = () => {
    return [
        body('emailOrUsername')
            .notEmpty().withMessage('Email hoặc username không được để trống')
            .trim(),
        body('password')
            .notEmpty().withMessage('password khong duoc de trong')
    ]

}
module.exports = {
    registerValidationRules,
    loginValidationRules
}