const { body } = require('express-validator');

const registerValidationRules = () => {
    return [
        body('username')
            .notEmpty().withMessage('username khong duoc bo trong ')
            .isLength({ min: 3, max: 30 }).withMessage("username phai tu 3 - 30 ky tu")
            .trim(),
        body('email')
            .notEmpty().withMessage('email khong duoc bo trong')
            .isEmail().withMessage('email khong hop le ')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('password khong duoc bo trong')
            .isLength({ min: 6 }).withMessage('mat khau toi thieu la 6 ky tu'),
    ]
}

const loginValidationRules = () => {
    return [
        body('emailOrUsername')
        .notEmpty().withMessage('email hoac username khong duoc bo trong') ,
        body('password')
        .notEmpty().withMessage('password khong duoc bo trong')

    ]
}
module.exports = {
    registerValidationRules ,
    loginValidationRules
}