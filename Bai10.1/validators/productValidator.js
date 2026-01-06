    const { body, param } = require('express-validator');

    const commonIdParamValidation = () => {
        return [
            param('id')
                .isInt({ min: 1 }).withMessage('id san pham la so nguyen duong ')
        ]
    }

    const categoryIdExitsValidator = body('categoryId')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('id danh muc khong hop le , phai la so nguyen duong')
        .custom(async (value) => {
            if (value) {
                const category = await Category.findByPk(value);
                if (!category) {
                    throw new Error("Danh muc khong ton tai");

                    // return Promise.reject("Danh muc khon ton tai")
                }
            }
            return true;
        })

    const createProductValidationRules = () => {
        return [
            body('name')
                .notEmpty().withMessage('Ten khong duoc de trong')
                .isLength({ min: 3, max: 255 }).withMessage('ten san pham phai tu 3 den 255 ky tu')
                .trim(),
            body('description')
                .optional()
                .isLength({ max: 500 }).withMessage('mo ta khong qua 500 ky tu')
                .trim(),
            body('price')
                .notEmpty().withMessage('Gia san pham khong duoc de trong')
                .isFloat({ min: 0 }).withMessage('Gia san pham la so khong am')
                .toFloat(),
            categoryIdExitsValidator
        ]
    }

    const updateProductValidationRules = () => {
        return [
            body('name')
                .optional()
                .isLength({ min: 3, max: 255 }).withMessage('ten san pham phai tu 3 den 255 ky tu')
                .trim(),
            body('description')
                .optional()
                .isLength({ max: 500 }).withMessage('mo ta khong qua 500 ky tu')
                .trim(),
            body('price')
                .optional()
                .isFloat({ min: 0 }).withMessage('Gia san pham la so khong am')
                .toFloat(),
            categoryIdExitsValidator
        ]
    }

    module.exports = {
        commonIdParamValidation ,
        createProductValidationRules ,
        updateProductValidationRules
    }