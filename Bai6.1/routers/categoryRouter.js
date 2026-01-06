const express = require('express');
const router = express.Router();
const { Category, Product } = require('../models');
const { body, validationResult } = require('express-validator')
const e = require('express');
const handleValidationErrors = require('../middlewares/validationErrorHandler');
const { commonIdParamValidation, createCategoryValidationRules, updateCategoryValidationRules } = require('../validators/categoryValidator');

// Lay tat ca danh muc 
router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.findAll(
            {
                include: [{
                    model: Product,
                    as: 'products'
                }]
            }
        );
        res.json(categories);
    } catch (error) {
        next(error);
    }
})

// lay danh muc theo id 
router.get('/:id',
    commonIdParamValidation,
    async (req, res, next) => {
    try {
        const categories = await Category.findByPk(req.params.id);
        if (!categories) {
            return res.status(404).send('khong tim thay')
        }
        res.json(categories)

    } catch (error) {
        next(error);
    }
})
// them danh mu 
router.post('/',
    createCategoryValidationRules ,
    handleValidationErrors,
    async (req, res, next) => {

        try {
            const newCategory = await Category.create(req.body);
            res.status(201).json(newCategory)
        } catch (error) {
            if (error.name = 'SequelizeUniqueConstraintError') {
                return res.status(400).json(
                    {
                        error: [{
                            msg: " ten danh muc bi trung ",
                            param: 'name',
                            location: 'body'
                        }]
                    }
                )
            }
            next(error)
        }
    })

// sua  danh muc
router.patch('/:id',
    updateCategoryValidationRules ,
    async (req, res, next) => {
    try {
        // updateRows : la so dong de cap nhat 
        const [updateRows] = await Category.update(req.body, {
            where: { id: req.params.id }
        })
        if (updateRows === 0) {
            return res.status(404).send('khong tim thay')
        }
        const updateCategories = await Category.findByPk(req.params.id);
        res.json(updateCategories)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id',
    commonIdParamValidation ,
    async (req, res, next) => {
    try {
        const deleteRows = await Category.destroy({
            where: { id: req.params.id }
        })
        if (deleteRows === 0) {
            return res.status(404).send('khong tim thay')
        }
        res.status(204).send();
    } catch (error) {
        next(error)
    }
})
module.exports = router;

//Eager loading

//Lazy loading