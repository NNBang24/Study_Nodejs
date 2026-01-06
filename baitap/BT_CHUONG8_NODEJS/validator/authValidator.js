const { body } = require('express-validator');
const { Model } = require('sequelize');

const registerValidationRules = () => {
    return [
        body('username')
            .notEmpty().withMessage('khong duoc bo trong')
            .isLength({ min: 3, max: 30 }).withMessage('username phai tu 3 - 30 ki tu')
            .trim(),
        body('email')
            .notEmpty().withMessage('email khong duoc bo trong')
            .isEmail().withMessage('Email khong hop le')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('password khong duoc bo trong')
            .isLength({ min: 6 }).withMessage('mat khau toi thieu tu 6 ky tu')
    ]
};
const loginValidationRules = () => {
    return [
        body('emailOrUsername')
            .notEmpty().withMessage('email hoac username khong duoc bo trong'),
        body('password')
            .notEmpty().withMessage('password khong duoc bo trong')

    ]
}
module.exports = {
    registerValidationRules,
    loginValidationRules
}